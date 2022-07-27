import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';

import { FormElement, FormType } from '../../../domain/entities/categoryForms/enums';
import { AddCategoryForm } from './AddCategoryForm';
import { AddCategoryElementErrors } from '../domain/useCase/categoryAddElement/AddCategoryElementErrors';

const mocker = new ModuleMocker(global);

describe('Add Category Form Element Usecase', () => {
  const categoryFormElement = {
    name: 'string',
    displayName: 'string',
    description: 'string',
    formType: FormType.URL,
    formElement: FormElement.BUTTON,
    exampleValue: null,
    values: null,
    value: null,
    editable: true,
    layout: 'string',
    searchable: true,
    filterable: false
  };

  it('Should successfull Add category form element with custom mock repo', async () => {
    const mockCustomRepo = {
      async addElement(categoryId, dataSource) {
        return categoryFormElement;
      }
    };
    const useCase = new AddCategoryForm({ categoryFormRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId, categoryFormElement);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(categoryFormElement);
  });

  it('Should return exeption when category notfound or set incorrect category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async addElement(categoryId, dataSource) {
        return null;
      }
    };
    const useCase = new AddCategoryForm({ categoryFormRepository: mockCustomRepo });

    const categoryId = 'fake-id';
    const result = await useCase.act(categoryId, categoryFormElement);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AddCategoryElementErrors.CategoryNotExistsError);
  });

  it('Should create category-form-element usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async addElement(categoryId, dataSource) {
        throw new Error('Mock Error');
      }
    };
    const useCase = new AddCategoryForm({ categoryFormRepository: mockCustomRepo });
    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId, categoryFormElement);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
