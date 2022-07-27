import { UseCaseError } from '../../../../../core/UseCaseError';
import { Result } from '../../../../../core/Result';

export namespace UserRegisterErrors {
  export class UserAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`
      } as UseCaseError);
    }
  }
}
