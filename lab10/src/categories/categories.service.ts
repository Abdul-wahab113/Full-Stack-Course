import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoriesRepo: Repository<Category>,
  ) {}

  private async ensureNameFree(name: string, exceptId?: number) {
    const existing = await this.categoriesRepo.findOneBy({ name });
    if (existing && existing.id !== exceptId) {
      throw new ConflictException(`Category "${name}" already exists`);
    }
  }

  async create(dto: CreateCategoryDto) {
    await this.ensureNameFree(dto.name);
    return this.categoriesRepo.save(this.categoriesRepo.create(dto));
  }

  findAll() {
    return this.categoriesRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepo.findOne({
      where: { id },
      relations: { notes: true },
    });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoriesRepo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    if (dto.name !== undefined) await this.ensureNameFree(dto.name, id);
    Object.assign(category, dto);
    return this.categoriesRepo.save(category);
  }

  async remove(id: number) {
    // onDelete: 'SET NULL' on Note.category keeps the notes, with categoryId = NULL
    const result = await this.categoriesRepo.delete(id);
    if (!result.affected) throw new NotFoundException(`Category ${id} not found`);
  }
}
