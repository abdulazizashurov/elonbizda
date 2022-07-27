import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';
import { CategoryRepository } from '../../../repository/Category';

import { CategoryGet } from './CategoryGet';
import { GetCategoryErorrs } from '../domain/useCase/getCategory/GetCategoryErrors';

const mocker = new ModuleMocker(global);

describe('Get Category Usecase', () => {
  const category = {
    name: 'test',
    icon: 'test',
    isHead: false,
    parentId: null
  };
  it('Should return exeption when category notfound or set incorrect category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findCategory(categoryId) {
        return null;
      }
    };
    const useCase = new CategoryGet({ categoryRepository: mockCustomRepo });

    const categoryId = 'fake-id';
    const result = await useCase.act(categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(GetCategoryErorrs.CategoryNotExistsError);
  });

  it('Should return category when input correct category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findCategory(categoryId) {
        return category;
      }
    };
    const useCase = new CategoryGet({ categoryRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(category);
  });

  it('Should get-category usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findCategory(categoryId) {
        throw new Error('Mock error');
      }
    };
    const useCase = new CategoryGet({ categoryRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
