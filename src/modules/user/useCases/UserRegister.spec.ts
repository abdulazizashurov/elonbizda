import 'jest-extended';
import { AppError } from '../../../core/ApplicationError';

import { UserRegister } from './UserRegister';
import { VerficationService } from '../services/Verfication';
import CodeGenerator from '../domain/CodeGenerator';
import { UserRegisterErrors } from '../domain/useCase/UserRegister/UserRegisterErrors';

describe('Register user Usecase', () => {
  const user = {
    firstName: 'user',
    lastName: 'user',
    email: 'example@gamil.com',
    phoneNumber: '998917934366',
    avatar: null,
    gender: null,
    password: 'hard-password',
    confirmPassword: 'hard-password'
  };
  const returnedUser = {
    id: '62750b12f4431c1e6c8f8860',
    firstName: 'user',
    lastName: 'user',
    email: 'example@gamil.com',
    phoneNumber: '998917934366',
    avatar: null,
    gender: null,
    password: 'hard-password',
    confirmPassword: 'hard-password',
    createdAt: 1651912194512,
    updatedAt: 1651912194512
  };
  const expectedResult = {
    id: '62750b12f4431c1e6c8f8860',
    firstName: 'user',
    lastName: 'user',
    email: 'example@gamil.com',
    phoneNumber: '998917934366',
    avatar: null,
    gender: null,
    createdAt: 1651912194512,
    updatedAt: 1651912194512
  };

  it('Should successfull register user with custom mock repo', async () => {
    const mockCustomRepo = {
      async findByEmail(email) {
        return null;
      },
      async register(user) {
        return returnedUser;
      }
    };
    const mockCodeGenerator = {
      async generate() {
        return '123456';
      }
    };
    const mockVerficationService = {
      async send() {
        return undefined;
      }
    };

    const useCase = new UserRegister({
      userRepository: mockCustomRepo,
      verficationService: mockVerficationService,
      codeGenerator: mockCodeGenerator
    });

    const result = await useCase.act(user);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(expectedResult);
  });

  it('Should excwption register user with custom mock repo and exist email', async () => {
    const mockCustomRepo = {
      async findByEmail(email) {
        return returnedUser;
      },
      async register(user) {
        return returnedUser;
      }
    };
    const mockCodeGenerator = {
      async generate() {
        return '123456';
      }
    };
    const mockVerficationService = {
      async send() {
        return undefined;
      }
    };

    const useCase = new UserRegister({
      userRepository: mockCustomRepo,
      verficationService: mockVerficationService,
      codeGenerator: mockCodeGenerator
    });

    const result = await useCase.act(user);

    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(UserRegisterErrors.UserAlreadyExistsError);
  });

  it('Should register user usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async register(user) {
        throw new Error('Mock Error');
      }
    };
    const useCase = new UserRegister({
      userRepository: mockCustomRepo,
      verficationService: VerficationService,
      codeGenerator: CodeGenerator
    });

    const result = await useCase.act(user);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
