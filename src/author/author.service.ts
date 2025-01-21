import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>, // Inyección del repositorio
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(newAuthor); // Guarda el nuevo autor en la base de datos
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({ relations: ['books'] }); // Incluye la relación con libros
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id }, // Asegúrate de que el campo `id` coincide con el de tu entidad
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }
  /*
  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id); // Retorna el autor actualizado
  }
    */
  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id); // Reutiliza el método findOne para verificar existencia
    Object.assign(author, updateAuthorDto);
    return await this.authorRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const author = await this.findOne(id); // Verifica que el autor exista
    await this.authorRepository.remove(author);
  }

}
