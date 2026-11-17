import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from '../notes/note.entity';

// Task 2: Category entity (one category -> many notes)
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  name: string;

  @OneToMany(() => Note, (note) => note.category)
  notes: Note[];
}
