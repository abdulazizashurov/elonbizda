import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';
import { CategoryUpdate } from './CategoryUpdate';
import { UpdateCategoryErrors } from '../domain/useCase/updateCategory/UpdateCategoryErrors';

const mocker = new ModuleMocker(global);

describe('Update Category Usecase', () => {
  const dataSource = {
    name: 'test',
    icon: 'test',
    isHead: false,
    parentId: null
  };
  it('Should return exeption when category notfound or set incorrect category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async update(categoryId, dataSource) {
        return null;
      }
    };
    const useCase = new CategoryUpdate({ categoryRepository: mockCustomRepo });

    const categoryId = 'fake-id';
    const result = await useCase.act(dataSource, categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(UpdateCategoryErrors.CategoryNotExistsError);
  });

  it('Should return category when input correct category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async update(categoryId, dataSource) {
        return dataSource;
      }
    };
    const useCase = new CategoryUpdate({ categoryRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(dataSource, categoryId);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(dataSource);
  });

  it('Should update-category usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async update(categoryId, dadataSourceta) {
        throw new Error('Mock error');
      }
    };
    const useCase = new CategoryUpdate({ categoryRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(dataSource, categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
