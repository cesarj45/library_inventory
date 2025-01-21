import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>, // Repositorio para manejar la relación con Author
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { authorId, ...bookData } = createBookDto;

    // Busca al autor por ID
    const author = await this.authorRepository.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    // Crea y guarda el libro
    const newBook = this.bookRepository.create({ ...bookData, author });
    return await this.bookRepository.save(newBook);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({ relations: ['author'] }); // Incluye la relación con el autor
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'], // Incluye la relación con el autor
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { authorId, ...bookData } = updateBookDto;

    // Busca el libro por ID
    const book = await this.findOne(id);

    // Si se proporciona un nuevo `authorId`, actualiza la relación con el autor
    if (authorId) {
      const author = await this.authorRepository.findOne({ where: { id: authorId } });
      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      book.author = author;
    }

    // Actualiza los demás datos del libro
    Object.assign(book, bookData);
    return await this.bookRepository.save(book); // Guarda los cambios
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book); // Elimina el libro
  }
}
