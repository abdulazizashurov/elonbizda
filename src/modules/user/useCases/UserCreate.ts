import { UseCase } from '../../../core/UseCase';
import { CreateUser } from '../domain/vobjects';
import { User } from '../../../domain/entities/user/User';
import { UserRepository } from '../../../repository/User';
import UserPassword from '../domain/UserPassword';
import { User as UserVeil } from '../domain/vobjects/User';
import { UserCreateResponse } from '../domain/useCase/UserCreate/UserCreateResponse';
import { left, Result, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';
import { UserCreateErrors } from '../domain/useCase/UserCreate/UserCreateErrors';

export class UserCreate implements UseCase<CreateUser, UserCreateResponse, any> {
  private userRepository: UserRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }
  async act(dataSource: CreateUser): Promise<UserCreateResponse> {
    try {
      let user = await this.userRepository.findByEmail(dataSource.email);
      if (user) {
        return left(new UserCreateErrors.UserAlreadyExistsError(dataSource.email));
      }
      const hashedPassword = await UserPassword.hashPassword(dataSource.password);
      const userWithSecurePassword = {
        ...dataSource,
        password: hashedPassword,
        verify: true
      };
      user = await this.userRepository.create(userWithSecurePassword);

      const userVeil = new UserVeil(user);
      return right(Result.ok<User>(userVeil.withoutSecrets()));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
