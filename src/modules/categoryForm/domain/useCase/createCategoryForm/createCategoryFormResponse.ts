import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { Category } from '../../../../../domain/entities/category/Category';

export type CreateCategoryFormResponse = Either<AppError.UnexpectedError | Result<any>, Result<Category>>;
