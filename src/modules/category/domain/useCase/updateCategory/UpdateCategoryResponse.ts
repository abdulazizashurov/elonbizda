import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { UpdateCategoryErrors } from './UpdateCategoryErrors';

export type UpdateCategoryResponse = Either<
  UpdateCategoryErrors.CategoryNotExistsError | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
