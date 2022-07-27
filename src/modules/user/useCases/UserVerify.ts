import { UseCase } from '../../../core/UseCase';
import { VerifyUser } from '../domain/vobjects';
import { User } from '../../../domain/entities/user/User';
import { UserRepository } from '../../../repository/User';
import { User as UserVeil } from '../domain/vobjects/User';
import { left, Result, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';
import { UserVerifyRespose } from '../domain/useCase/UserVerify/UserVerifyRespose';
import { UserVerifyErrors } from '../domain/useCase/UserVerify/UserVerifyErrors';

export class UserVerify implements UseCase<VerifyUser, UserVerifyRespose, any> {
  private userRepository: UserRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }
  async act(dataSource: VerifyUser): Promise<UserVerifyRespose> {
    try {
      const user = await this.userRepository.verifyUser(dataSource.code);
      if (user) {
        const userVeil = new UserVeil(user);
        return right(Result.ok<User>(userVeil.withoutSecrets()));
      }
      return left(new UserVerifyErrors.InCorrectCodeOrNotFoundError());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
