import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';

import { RemoveCategroyForm } from './RemoveCategroyForm';
import { RemoveCategoryFormErrors } from '../domain/useCase/categoryFormRemove/RemoveCategoryFormErrors';

new ModuleMocker(global);
describe('Remove Categoryform Usecase', () => {
  const category = {
    name: 'test',
    icon: 'test',
    isHead: false,
    parentId: null,
    additionalInfoForms: null
  };
  it('Should return exeption when category notfound or set incorrect category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async remove(categoryId) {
        return null;
      }
    };
    const useCase = new RemoveCategroyForm({ categoryFormRepository: mockCustomRepo });

    const categoryId = 'fake-id';
    const result = await useCase.act(categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(RemoveCategoryFormErrors.CategoryNotExistsError);
  });

  it('Should remove category when input correct category id', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async remove(categoryId) {
        return category;
      }
    };
    const useCase = new RemoveCategroyForm({ categoryFormRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(category);
  });

  it('Should remove category form usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async remove(categoryId) {
        throw new Error('Mock error');
      }
    };
    const useCase = new RemoveCategroyForm({ categoryFormRepository: mockCustomRepo });

    const categoryId = 'correct-id';
    const result = await useCase.act(categoryId);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
