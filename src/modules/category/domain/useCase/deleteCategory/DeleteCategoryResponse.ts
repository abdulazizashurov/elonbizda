import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { DeleteCategoryErrors } from '../../useCase/deleteCategory/DeleteCategoryErrors';
export type DeleteCategoryResponse = Either<
  DeleteCategoryErrors.CategoryNotExistsError | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
