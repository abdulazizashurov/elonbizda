import { UseCaseError } from '../../../../../core/UseCaseError';
import { Result } from '../../../../../core/Result';

export namespace CreateCategoryFormErrors {
  export class CategoryNotExistsError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `The category ${id} not exist`
      } as UseCaseError);
    }
  }
}
