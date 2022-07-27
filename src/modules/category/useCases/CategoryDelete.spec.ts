import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';

import { CategoryDelete } from './CategoryDelete';
import { DeleteCategoryErrors } from '../domain/useCase/deleteCategory/DeleteCategoryErrors';
new ModuleMocker(global);
describe('Delete Category Usecase', () => {
  const category = {
    name: 'test',
    icon: 'test',
    isHead: false,
    parentId: null
  };
  it('Should return exeption when category notfound or set incorrect category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async delete(categoryId) {
        return null;
      }
    };
    const useCase = new CategoryDelete({ categoryRepository: mockCustomRepo });

    const categoryId = '';
    const result = await useCase.act(categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(DeleteCategoryErrors.CategoryNotExistsError);
  });

  it('Should remove category when input correct category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async delete(categoryId) {
        return category;
      }
    };
    const useCase = new CategoryDelete({ categoryRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    console.log(value);
    expect(value).toStrictEqual(category);
  });

  it('Should delete category usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async delete(categoryId) {
        throw new Error('Mock error');
      }
    };
    const useCase = new CategoryDelete({ categoryRepository: mockCustomRepo });
    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
