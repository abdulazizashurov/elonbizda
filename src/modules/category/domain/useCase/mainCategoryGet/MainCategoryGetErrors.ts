import { UseCaseError } from '../../../../../core/UseCaseError';
import { Result } from '../../../../../core/Result';

export namespace GetCategoryErorrs {
  export class CategoryNotExistsError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `The category ${id} not exist`
      } as UseCaseError);
    }
  }
}
