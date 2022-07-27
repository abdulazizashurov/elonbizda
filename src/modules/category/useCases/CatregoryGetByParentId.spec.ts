import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';
import { CategoryRepository } from '../../../repository/Category';

import { CatregoryGetByParentId } from './CatregoryGetByParentId';
import { GetCategoryByParentIdErorrs } from '../domain/useCase/getCategoryByParentId/GetCategoryByParentIdErrors';
const mocker = new ModuleMocker(global);

describe('Get Category By Parent ID Usecase', () => {
  const category = {
    name: 'test',
    icon: 'test',
    isHead: false,
    parentId: null
  };
  it('Should return exeption when category notfound or set incorrect category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findCategoryByParentId(parentId) {
        return null;
      }
    };
    const useCase = new CatregoryGetByParentId({ categoryRepository: mockCustomRepo });

    const parentId = 'fake-id';
    const result = await useCase.act(parentId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(GetCategoryByParentIdErorrs.CategoryNotExistsError);
  });

  it('Should return category when input correct category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findCategoryByParentId(parentId) {
        return category;
      }
    };
    const useCase = new CatregoryGetByParentId({ categoryRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(category);
  });

  it('Should get-category usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findCategoryByParentId(parentId) {
        throw new Error('Mock error');
      }
    };
    const useCase = new CatregoryGetByParentId({ categoryRepository: mockCustomRepo });

    const parentId = 'correct-id';
    const result = await useCase.act(parentId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
