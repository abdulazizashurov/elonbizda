import { UseCase } from '../../../core/UseCase';
import { Category } from '../../../domain/entities/category/Category';
import { CategoryRepository } from '../../../repository/Category';
import { GetCategoryResponse } from '../domain/useCase/getCategory/GetCategoryResponse';
import { left, Result, right } from '../../../core/Result';
import { GetCategoryErorrs } from '../domain/useCase/getCategory/GetCategoryErrors';
import { AppError } from '../../../core/ApplicationError';

export class CategoryGet implements UseCase<string, GetCategoryResponse, any> {
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }
  async act(categoryId: string): Promise<GetCategoryResponse> {
    try {
      const category = await this.categoryRepository.findCategory(categoryId);
      if (category) {
        return right(Result.ok<Category>(category) as any);
      }
      return left(new GetCategoryErorrs.CategoryNotExistsError(categoryId));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
