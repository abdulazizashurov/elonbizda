import { UseCase } from '../../../core/UseCase';
import { UpdateCategory } from '../domain/vobjects';
import { Category } from '../../../domain/entities/category/Category';
import { CategoryRepository } from '../../../repository/Category';
import { UpdateCategoryResponse } from '../domain/useCase/updateCategory/UpdateCategoryResponse';
import { left, Result, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';
import { UpdateCategoryErrors } from '../domain/useCase/updateCategory/UpdateCategoryErrors';

export class CategoryUpdate implements UseCase<UpdateCategory, Promise<UpdateCategoryResponse>, string> {
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }
  async act(dataSource: UpdateCategory, categoryId: string): Promise<UpdateCategoryResponse> {
    try {
      const category = await this.categoryRepository.update(categoryId, dataSource);
      if (category) {
        return right(Result.ok<Category>(category) as any);
      }
      return left(new UpdateCategoryErrors.CategoryNotExistsError(categoryId));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
