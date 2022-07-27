import { UseCase } from '../../../core/UseCase';
import { Result, left, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';

import { MainCreateCategory } from '../domain/vobjects';
import { Category } from '../../../domain/entities/category/Category';
import { CategoryRepository } from '../../../repository/Category';
import { MainCreateCategoryResponse } from '../domain/useCase/mainCreateCategory/CreateMainCategoryRespose';

export class MainCategoryCreate implements UseCase<MainCreateCategory, Promise<MainCreateCategoryResponse>, any> {
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }
  async act(dataSource: MainCreateCategory): Promise<MainCreateCategoryResponse> {
    try {
      const category = await this.categoryRepository.createMain(dataSource);
      return right(Result.ok<Category>(category));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
