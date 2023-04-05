import { DocumentType } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import EditMovieDto from './dto/edit-movie.dto.js';

export interface MovieServiceInterface {
  create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>;
  editByID(movieID: string, dto: EditMovieDto): Promise<DocumentType<MovieEntity> | null>;
  deleteById(movieID: string): Promise<DocumentType<MovieEntity> | null>;
  find(count?: number): Promise<DocumentType<MovieEntity>[]>;
  findByGenre(genreType: string, count?: number): Promise<DocumentType<MovieEntity>[]>;
  findById(movieID: string): Promise<DocumentType<MovieEntity>[] | null>;
  findPromo(): Promise<DocumentType<MovieEntity>[] | null>;
  findFavorites(): Promise<DocumentType<MovieEntity>[] | null>;
  editFavorite(movieID: string): Promise<DocumentType<MovieEntity> | null>;
  incCommentCount(movieID: string): Promise<DocumentType<MovieEntity> | null>;
  exists(movieID: string): Promise<boolean>;
}
