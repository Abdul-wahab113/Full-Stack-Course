import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';
import { Category } from '../categories/category.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  // Task 2: new columns
  @Column({ default: false })
  isPinned: boolean;

  @Column({ type: 'int', default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  // Task 2: a note belongs to at most one category (nullable FK, SET NULL on delete)
  @ManyToOne(() => Category, (category) => category.notes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category | null;

  @Column({ type: 'int', nullable: true })
  categoryId: number | null;

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: true })
  @JoinTable({ name: 'note_tags' })
  tags: Tag[];
}
