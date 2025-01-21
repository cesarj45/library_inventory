import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })  // Permite que 'bio' sea NULL en la base de datos
  bio: string;
  
  @Column()
  birthDate: string;

  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  books: Book[];
}
