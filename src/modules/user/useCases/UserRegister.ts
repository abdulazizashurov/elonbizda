import { UseCase } from '../../../core/UseCase';
import { RegisterUser } from '../domain/vobjects';
import { User } from '../../../domain/entities/user/User';
import { UserRepository } from '../../../repository/User';
import UserPassword from '../domain/UserPassword';
import { VerficationService } from '../services/Verfication';
import { UserRegisterResponse } from '../domain/useCase/UserRegister/UserRegisterResponse';
import CodeGenerator from '../domain/CodeGenerator';
import { left, Result, right } from '../../../core/Result';
import { UserRegisterErrors } from '../domain/useCase/UserRegister/UserRegisterErrors';
import { AppError } from '../../../core/ApplicationError';
import { User as UserVeil } from '../domain/vobjects/User';

export class UserRegister implements UseCase<RegisterUser, UserRegisterResponse, any> {
  private userRepository: UserRepository;
  private verficationService: VerficationService;
  private codeGenerator: CodeGenerator;

  constructor({ userRepository, verficationService, codeGenerator }) {
    this.userRepository = userRepository;
    this.verficationService = verficationService;
    this.codeGenerator = codeGenerator;
  }
  async act(dataSource: RegisterUser): Promise<UserRegisterResponse> {
    try {
      let user = await this.userRepository.findByEmail(dataSource.email);
      if (user) {
        return left(new UserRegisterErrors.UserAlreadyExistsError(dataSource.email));
      }
      const hashedPassword = await UserPassword.hashPassword(dataSource.password);
      const verificationCode = await this.codeGenerator.generate();
      const userWithSecurePassword = {
        ...dataSource,
        password: hashedPassword,
        verificationCode
      };

      user = await this.userRepository.register(userWithSecurePassword);

      await this.verficationService.send({
        message: verificationCode,
        phoneNumber: user.phoneNumber
      });

      const userVeil = new UserVeil(user);
      return right(Result.ok<User>(userVeil.withoutSecrets()));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
