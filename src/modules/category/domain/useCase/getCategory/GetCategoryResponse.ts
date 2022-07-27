import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { GetCategoryErorrs } from './GetCategoryErrors';
export type GetCategoryResponse = Either<
  GetCategoryErorrs.CategoryNotExistsError | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
