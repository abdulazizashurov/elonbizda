import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { RemoveCategoryFormErrors } from '../../useCase/categoryFormRemove/RemoveCategoryFormErrors';
import { Category } from '../../../../../domain/entities/category/Category';
export type RemoveCategoryFormResponse = Either<
  RemoveCategoryFormErrors.CategoryNotExistsError | AppError.UnexpectedError | Result<any>,
  Result<Category>
>;
