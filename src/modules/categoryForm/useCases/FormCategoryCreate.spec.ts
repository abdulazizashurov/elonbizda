import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';

import { FormCategoryCreate } from './FormCategoryCreate';
import { FormElement, FormType } from '../../../domain/entities/categoryForms/enums';
import { CreateCategoryFormErrors } from '../domain/useCase/createCategoryForm/createCategoryFormErrors';

const mocker = new ModuleMocker(global);

describe('Create Category Form Usecase', () => {
  const categoryForm = {
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

  it('Should successfull create category form with custom mock repo', async () => {
    const mockCustomRepo = {
      async create(categoryId, dataSource) {
        return categoryForm;
      }
    };
    const useCase = new FormCategoryCreate({ categoryFormRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId, [categoryForm]);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(categoryForm);
  });

  it('Should return exeption when category notfound or set incorrect category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async create(categoryId, dataSource) {
        return null;
      }
    };
    const useCase = new FormCategoryCreate({ categoryFormRepository: mockCustomRepo });

    const categoryId = 'fake-id';
    const result = await useCase.act(categoryId, [categoryForm]);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(CreateCategoryFormErrors.CategoryNotExistsError);
  });

  it('Should create category-form usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async create(categoryId, dataSource) {
        throw new Error('Mock Error');
      }
    };
    const useCase = new FormCategoryCreate({ categoryFormRepository: mockCustomRepo });
    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId, [categoryForm]);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
