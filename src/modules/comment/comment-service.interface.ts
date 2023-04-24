import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByMovieID(movieID: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByMovieID(movieID: string): Promise<number | null>;
}
