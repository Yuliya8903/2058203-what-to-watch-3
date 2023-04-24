import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../types/components.type.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CommentService from './comment.service.js';
import { CommentEntity, CommentModel } from './comment.entity.js';

const commentContainer = new Container();

commentContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

export {commentContainer};
