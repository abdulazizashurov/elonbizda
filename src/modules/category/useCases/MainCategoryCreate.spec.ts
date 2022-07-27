import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';

import { CategoryRepository } from '../../../repository/Category';
import { MainCategoryCreate } from './MainCategoryCreate';

const mocker = new ModuleMocker(global);

describe('Create MinaCategory Usecase', () => {
  const category = {
    name: 'test',
    icon: 'test',
    isHead: false,
    parentId: null
  };
  it('Should successfull create main-category with mock repo', async () => {
    const MockRepo = mocker.generateFromMetadata(mocker.getMetadata(CategoryRepository));

    const useCase = new MainCategoryCreate({ categoryRepository: new MockRepo() });

    const result = await useCase.act(category);
    expect(result.isRight()).toBe(true);
  });

  it('Should successfull create main-category with custom mock repo', async () => {
    const mockCustomRepo = {
      async createMain(category) {
        return category;
      }
    };
    const useCase = new MainCategoryCreate({ categoryRepository: mockCustomRepo });
    const result = await useCase.act(category);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(category);
  });

  it('Should create main-category usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async createMain(_category) {
        throw new Error('Mock Error');
      }
    };
    const useCase = new MainCategoryCreate({ categoryRepository: mockCustomRepo });
    const result = await useCase.act(category);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
