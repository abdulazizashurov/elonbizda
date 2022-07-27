import { UseCase } from '../../../core/UseCase';
import { Category } from '../../../domain/entities/category/Category';
import { CategoryRepository } from '../../../repository/Category';
import { left, Result, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';
import { GetCategoryByParentIdResponse } from '../domain/useCase/getCategoryByParentId/GetCategoryByParentIdResponse';
import { GetCategoryByParentIdErorrs } from '../domain/useCase/getCategoryByParentId/GetCategoryByParentIdErrors';

export class CatregoryGetByParentId implements UseCase<string, Promise<GetCategoryByParentIdResponse>, any> {
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }
  async act(parentId: string): Promise<GetCategoryByParentIdResponse> {
    try {
      const category = await this.categoryRepository.findCategoryByParentId(parentId);
      if (category) {
        return right(Result.ok<Category[]>(category));
      }
      return left(new GetCategoryByParentIdErorrs.CategoryNotExistsError(parentId));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
