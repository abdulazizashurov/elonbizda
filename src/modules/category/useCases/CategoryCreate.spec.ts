import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';

import { CategoryCreate } from './CategoryCreate';
import { CategoryRepository } from '../../../repository/Category';

const mocker = new ModuleMocker(global);

describe('Create Category Usecase', () => {
  it('Should successfull create category with mock repo', async () => {
    const MockRepo = mocker.generateFromMetadata(mocker.getMetadata(CategoryRepository));

    const useCase = new CategoryCreate({ categoryRepository: new MockRepo() });

    const category = {
      name: 'test',
      icon: 'test',
      isHead: false,
      parentId: null
    };
    const result = await useCase.act(category);
    expect(result.isRight()).toBe(true);
  });

  it('Should successfull create category with custom mock repo', async () => {
    const mockCustomRepo = {
      async create(category) {
        return category;
      }
    };
    const useCase = new CategoryCreate({ categoryRepository: mockCustomRepo });

    const category = {
      name: 'test',
      icon: 'test',
      isHead: false,
      parentId: null
    };
    const result = await useCase.act(category);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value.name).toBe(category.name);
    expect(value.icon).toBe(category.icon);
    expect(value.isHead).toBe(category.isHead);
  });

  it('Should create category usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async create(_category) {
        throw new Error('Mock Error');
      }
    };
    const useCase = new CategoryCreate({ categoryRepository: mockCustomRepo });

    const category = {
      name: 'test',
      icon: 'test',
      isHead: false,
      parentId: null
    };
    const result = await useCase.act(category);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
