import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from '../notes/note.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  name: string;

  @ManyToMany(() => Note, (note) => note.tags)
  notes: Note[];
}
