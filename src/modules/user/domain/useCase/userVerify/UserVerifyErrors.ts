import { UseCaseError } from '../../../../../core/UseCaseError';
import { Result } from '../../../../../core/Result';

export namespace UserVerifyErrors {
  export class InCorrectCodeOrNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'User is not found or incorrect code'
      } as UseCaseError);
    }
  }
}
