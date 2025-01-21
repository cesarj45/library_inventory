import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE', eager: true })
  author: Author;
}
