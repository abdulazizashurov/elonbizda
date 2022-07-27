import { UseCase } from '../../../core/UseCase';
import { Result, left, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';

import { CategoryFormElement } from '../domain/vobjects';
import { CategoryFormRepository } from '../../../repository/CategoryForm';
import { AddCategoryElementResponse } from '../domain/useCase/categoryAddElement/AddCategoryElementResponse';
import { Category } from '../../../domain/entities/category/Category';
import { AddCategoryElementErrors } from '../domain/useCase/categoryAddElement/AddCategoryElementErrors';

export class AddCategoryForm implements UseCase<CategoryFormElement, Promise<AddCategoryElementResponse>, any> {
  private categoryFormRepository: CategoryFormRepository;

  constructor({ categoryFormRepository }) {
    this.categoryFormRepository = categoryFormRepository;
  }
  async act(categoryId, dataSource: CategoryFormElement): Promise<AddCategoryElementResponse> {
    try {
      const categoryElement = await this.categoryFormRepository.addElement(categoryId, dataSource);
      if (categoryElement) {
        return right(Result.ok<Category>(categoryElement) as any);
      }
      return left(new AddCategoryElementErrors.CategoryNotExistsError(categoryId));
    } catch (e) {
      console.log(e);
      return left(new AppError.UnexpectedError(e));
    }
  }
}
