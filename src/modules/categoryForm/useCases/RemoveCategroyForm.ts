import { UseCase } from '../../../core/UseCase';
import { Result, left, right } from '../../../core/Result';
import { Category } from '../../../domain/entities/category/Category';
import { RemoveCategoryFormErrors } from '../domain/useCase/categoryFormRemove/RemoveCategoryFormErrors';
import { RemoveCategoryFormResponse } from '../domain/useCase/categoryFormRemove/RemoveCategoryFormResponse';
import { AppError } from '../../../core/ApplicationError';
import { CategoryFormRepository } from '../../../repository/CategoryForm';

export class RemoveCategroyForm implements UseCase<string, Promise<RemoveCategoryFormResponse>, any> {
  private categoryFormRepository: CategoryFormRepository;

  constructor({ categoryFormRepository }) {
    this.categoryFormRepository = categoryFormRepository;
  }
  async act(categoryId: string): Promise<RemoveCategoryFormResponse> {
    try {
      const category = await this.categoryFormRepository.remove(categoryId);
      if (category) {
        return right(Result.ok<Category>(category) as any);
      }
      return left(new RemoveCategoryFormErrors.CategoryNotExistsError(categoryId));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
