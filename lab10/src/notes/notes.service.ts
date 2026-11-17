import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Note } from './note.entity';
import { Tag } from '../tags/tag.entity';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { QueryNotesDto } from './dto/query-notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly notesRepo: Repository<Note>,
    @InjectRepository(Tag) private readonly tagsRepo: Repository<Tag>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Category) private readonly categoriesRepo: Repository<Category>,
  ) {}

  /** Reuses existing tags by name and creates the missing ones. */
  private async resolveTags(names: string[]): Promise<Tag[]> {
    const unique = [...new Set(names.map((n) => n.trim().toLowerCase()))];
    if (!unique.length) return [];
    const existing = await this.tagsRepo.findBy({ name: In(unique) });
    const missing = unique
      .filter((n) => !existing.some((t) => t.name === n))
      .map((name) => this.tagsRepo.create({ name }));
    return [...existing, ...missing];
  }

  // Task 4: 404 if the category does not exist
  private async ensureCategory(categoryId: number) {
    const exists = await this.categoriesRepo.existsBy({ id: categoryId });
    if (!exists) throw new NotFoundException(`Category ${categoryId} not found`);
  }

  async create(dto: CreateNoteDto) {
    if (!(await this.usersRepo.existsBy({ id: dto.userId }))) {
      throw new NotFoundException(`User ${dto.userId} not found`);
    }
    if (dto.categoryId !== undefined) await this.ensureCategory(dto.categoryId);

    const note = this.notesRepo.create({
      title: dto.title,
      content: dto.content,
      userId: dto.userId,
      categoryId: dto.categoryId ?? null,
      isPinned: dto.isPinned ?? false,
      tags: await this.resolveTags(dto.tags ?? []),
    });
    const saved = await this.notesRepo.save(note);
    return this.findById(saved.id);
  }

  // Tasks 4 + 6: pagination, search, tag/category filters, pinned first then newest
  async findAll(query: QueryNotesDto) {
    const { page, limit, search, tag, categoryId } = query;

    const qb = this.notesRepo
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.category', 'category')
      .leftJoinAndSelect('note.tags', 'tags');

    if (search) {
      qb.andWhere('note.title ILIKE :search', { search: `%${search}%` });
    }
    if (categoryId) {
      qb.andWhere('note.categoryId = :categoryId', { categoryId });
    }
    if (tag) {
      // sub-query keeps all of a note's tags in the response, not just the matching one
      qb.andWhere(
        (sub) =>
          'note.id IN ' +
          sub
            .subQuery()
            .select('n.id')
            .from(Note, 'n')
            .innerJoin('n.tags', 't')
            .where('t.name = :tag')
            .getQuery(),
        { tag: tag.toLowerCase() },
      );
    }

    const [data, total] = await qb
      .orderBy('note.isPinned', 'DESC')
      .addOrderBy('note.createdAt', 'DESC')
      .addOrderBy('note.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  private async findById(id: number) {
    const note = await this.notesRepo.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
    if (!note) throw new NotFoundException(`Note ${id} not found`);
    return note;
  }

  // Task 4: every fetch increases views by 1
  async findOne(id: number) {
    const result = await this.notesRepo.increment({ id }, 'views', 1);
    if (!result.affected) throw new NotFoundException(`Note ${id} not found`);
    return this.findById(id);
  }

  async update(id: number, dto: UpdateNoteDto) {
    const note = await this.findById(id);

    if (dto.categoryId !== undefined) {
      await this.ensureCategory(dto.categoryId);
      note.category = { id: dto.categoryId } as Category;
      note.categoryId = dto.categoryId;
    }
    if (dto.title !== undefined) note.title = dto.title;
    if (dto.content !== undefined) note.content = dto.content;
    if (dto.isPinned !== undefined) note.isPinned = dto.isPinned;
    if (dto.tags !== undefined) note.tags = await this.resolveTags(dto.tags);

    await this.notesRepo.save(note);
    return this.findById(id);
  }

  async remove(id: number) {
    const result = await this.notesRepo.delete(id);
    if (!result.affected) throw new NotFoundException(`Note ${id} not found`);
  }
}
