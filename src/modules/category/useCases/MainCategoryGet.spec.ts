import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';
import { MainCategoryGet } from './MainCategoryGet';

const mocker = new ModuleMocker(global);

describe('Get Main-Category Usecase', () => {
  const category = {
    name: 'test',
    icon: 'test',
    isHead: false,
    parentId: null
  };

  it('Should return categories Array', async () => {
    const mockCustomRepo = {
      async getMainCategories() {
        return [category];
      }
    };
    const useCase = new MainCategoryGet({ categoryRepository: mockCustomRepo });

    const result = await useCase.act();
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual([category]);
  });

  it('Should get-main-category usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      async getMainCategories() {
        throw new Error('Mock error');
      }
    };
    const useCase = new MainCategoryGet({ categoryRepository: mockCustomRepo });
    const result = await useCase.act();
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
