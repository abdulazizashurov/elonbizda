import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';

export type CreateCategoryResponse = Either<AppError.UnexpectedError | Result<any>, Result<void>>;
