import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { Author } from './author/entities/author.entity';
import { Book } from './book/entities/book.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',  
      port: 3306,  
      username: 'root', 
      password: 'root', 
      database: 'library_inventory',
      entities: [Author, Book],
      synchronize: true,
    }),
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
