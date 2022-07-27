import 'jest-extended';
import { AppError } from '../../../core/ApplicationError';
import { UserCreate } from './UserCreate';
import { UserCreateErrors } from '../domain/useCase/UserCreate/UserCreateErrors';

describe('Create user Usecase', () => {
  const user = {
    firstName: 'user',
    lastName: 'user',
    email: 'example@gamil.com',
    phoneNumber: '998917934366',
    password: 'hard-password'
  };
  const returnedUser = {
    id: '62750b12f4431c1e6c8f8860',
    firstName: 'user',
    lastName: 'user',
    avatar: null,
    gender: null,
    email: 'example@gamil.com',
    phoneNumber: '998917934366',
    createdAt: 1651912194512,
    updatedAt: 1651912194512
  };

  it('Should successfull create user with custom mock repo', async () => {
    const mockCustomRepo = {
      async findByEmail(email) {
        return null;
      },
      async create(user) {
        return returnedUser;
      }
    };

    const useCase = new UserCreate({
      userRepository: mockCustomRepo
    });

    const result = await useCase.act(user);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(returnedUser);
  });

  it('Should excwption create user with custom mock repo and exist email', async () => {
    const mockCustomRepo = {
      async findByEmail(email) {
        return returnedUser;
      },
      async register(user) {
        return returnedUser;
      }
    };

    const useCase = new UserCreate({
      userRepository: mockCustomRepo
    });

    const result = await useCase.act(user);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(UserCreateErrors.UserAlreadyExistsError);
  });

  it('Should create user usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      async register(user) {
        throw new Error('Mock Error');
      }
    };
    const useCase = new UserCreate({
      userRepository: mockCustomRepo
    });

    const result = await useCase.act(user);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
