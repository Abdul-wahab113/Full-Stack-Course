import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  async create(dto: CreateUserDto) {
    if (await this.usersRepo.findOneBy({ email: dto.email })) {
      throw new ConflictException('Email already registered');
    }
    const user = this.usersRepo.create({
      name: dto.name,
      email: dto.email,
      profile: { bio: dto.bio ?? null },
    });
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find({ relations: { profile: true }, order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: { profile: true, notes: true },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepo.remove(user);
  }

  // Task 5: user statistics with the query builder
  async getStats(id: number) {
    const raw = await this.usersRepo
      .createQueryBuilder('user')
      .leftJoin('user.notes', 'note')
      .select('user.id', 'userId')
      .addSelect('user.name', 'name')
      .addSelect('COUNT(note.id)', 'totalNotes')
      .addSelect('COUNT(*) FILTER (WHERE note."isPinned" = true)', 'pinnedNotes')
      .addSelect('COALESCE(SUM(note.views), 0)', 'totalViews')
      .where('user.id = :id', { id })
      .groupBy('user.id')
      .getRawOne();

    if (!raw) throw new NotFoundException(`User ${id} not found`);

    // PostgreSQL returns COUNT/SUM as strings -> convert to numbers
    return {
      userId: Number(raw.userId),
      name: raw.name,
      totalNotes: Number(raw.totalNotes),
      pinnedNotes: Number(raw.pinnedNotes),
      totalViews: Number(raw.totalViews),
    };
  }
}
