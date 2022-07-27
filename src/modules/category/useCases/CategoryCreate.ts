import { UseCase } from '../../../core/UseCase';
import { Result, Either, left, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';

import { CreateCategory } from '../domain/vobjects';
import { Category } from '../../../domain/entities/category/Category';
import { CategoryRepository } from '../../../repository/Category';

type Response = Either<AppError.UnexpectedError, Result<Category>>;

export class CategoryCreate implements UseCase<CreateCategory, Promise<Response>, any> {
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }
  async act(dataSource: CreateCategory): Promise<Response> {
    try {
      const category = await await this.categoryRepository.create(dataSource);

      return right(Result.ok<Category>(category));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
