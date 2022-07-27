import { UseCase } from '../../../core/UseCase';
import { Category } from '../../../domain/entities/category/Category';
import { CategoryRepository } from '../../../repository/Category';
import { left, Result, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';
import { GetCategoryResponse } from '../domain/useCase/mainCategoryGet/MainCategoryGetResponse';

export class MainCategoryGet implements UseCase<any, Promise<GetCategoryResponse>, any> {
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }
  async act(): Promise<GetCategoryResponse> {
    try {
      const category = await this.categoryRepository.getMainCategories();
      return right(Result.ok<Category[]>(category));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
