import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number; // Nueva propiedad
}