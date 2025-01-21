import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    genre?: string;
  
    @IsNumber()
    @IsOptional()
    authorId?: number; // Nueva propiedad opcional
  }
//export class UpdateBookDto extends PartialType(CreateBookDto) {}
