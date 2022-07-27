import { UseCase } from '../../../core/UseCase';
import { Result, left, right } from '../../../core/Result';
import { Category } from '../../../domain/entities/category/Category';
import { CategoryRepository } from '../../../repository/Category';
import { DeleteCategoryErrors } from '../domain/useCase/deleteCategory/DeleteCategoryErrors';
import { DeleteCategoryResponse } from '../domain/useCase/deleteCategory/DeleteCategoryResponse';
import { AppError } from '../../../core/ApplicationError';

export class CategoryDelete implements UseCase<string, Promise<DeleteCategoryResponse>, any> {
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }
  async act(categoryId: string): Promise<DeleteCategoryResponse> {
    try {
      const category = await this.categoryRepository.delete(categoryId);
      if (category) {
        return right(Result.ok<Category>(category) as any);
      }
      return left(new DeleteCategoryErrors.CategoryNotExistsError(categoryId));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
