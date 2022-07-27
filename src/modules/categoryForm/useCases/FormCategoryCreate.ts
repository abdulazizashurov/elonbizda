import { UseCase } from '../../../core/UseCase';
import { Result, left, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';

import { CreateCategoryForm } from '../domain/vobjects';
import { CategoryFormRepository } from '../../../repository/CategoryForm';
import { CreateCategoryFormResponse } from '../domain/useCase/createCategoryForm/createCategoryFormResponse';
import { Category } from '../../../domain/entities/category/Category';
import { CreateCategoryFormErrors } from '../domain/useCase/createCategoryForm/createCategoryFormErrors';

export class FormCategoryCreate implements UseCase<CreateCategoryForm[], Promise<CreateCategoryFormResponse>, any> {
  private categoryFormRepository: CategoryFormRepository;

  constructor({ categoryFormRepository }) {
    this.categoryFormRepository = categoryFormRepository;
  }
  async act(categoryId, dataSource: CreateCategoryForm[]): Promise<CreateCategoryFormResponse> {
    try {
      const categoryForm = await this.categoryFormRepository.create(categoryId, dataSource);
      if (categoryForm) {
        return right(Result.ok<Category>(categoryForm) as any);
      }
      return left(new CreateCategoryFormErrors.CategoryNotExistsError(categoryId));
    } catch (e) {
      console.log(e);
      return left(new AppError.UnexpectedError(e));
    }
  }
}
