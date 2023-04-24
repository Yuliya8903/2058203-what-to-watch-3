import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/components.type.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userID');
  }

  public async findByMovieID(movieID: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({movieID})
      .populate('userID');
  }

  public async deleteByMovieID(movieID: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({movieID})
      .exec();

    return result.deletedCount;
  }
}
