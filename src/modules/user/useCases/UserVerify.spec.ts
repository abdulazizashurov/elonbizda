import 'jest-extended';
import { ModuleMocker } from 'jest-mock';

import { AppError } from '../../../core/ApplicationError';

import { UserVerify } from './UserVerify';
import { UserVerifyErrors } from '../domain/useCase/UserVerify/UserVerifyErrors';

const mocker = new ModuleMocker(global);

describe('Verify user Usecase', () => {
  const code = {
    code: '909665'
  };

  const user = {
    id: '62752ae188f97f1228b0f3c4',
    firstName: 'Khasan',
    lastName: 'Abdukarimov',
    phoneNumber: '+998983065001',
    email: 'khasanabdukarimov@gmail.com',
    verificationCode: '909665',
    gender: undefined,
    avatar: undefined,
    createdAt: 1651912194512,
    updatedAt: 1651912194512
  };
  const expectedResult = {
    id: '62752ae188f97f1228b0f3c4',
    firstName: 'Khasan',
    lastName: 'Abdukarimov',
    phoneNumber: '+998983065001',
    email: 'khasanabdukarimov@gmail.com',
    gender: undefined,
    avatar: undefined,
    createdAt: 1651912194512,
    updatedAt: 1651912194512
  };

  it('Should successful verify user with custom mock repo', async () => {
    const mockCustomRepo = {
      async verifyUser() {
        return user;
      }
    };

    const useCase = new UserVerify({
      userRepository: mockCustomRepo
    });

    const result = await useCase.act(code);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(expectedResult);
  });

  it('Should expretion verify user with custom mock repo and incorrect code', async () => {
    const mockCustomRepo = {
      async verifyUser() {
        return null;
      }
    };

    const useCase = new UserVerify({
      userRepository: mockCustomRepo
    });

    const result = await useCase.act(code);

    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(UserVerifyErrors.InCorrectCodeOrNotFoundError);
  });

  it('Should verify user usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      async verifyUser() {
        throw new Error('Mock Error');
      }
    };

    const useCase = new UserVerify({
      userRepository: mockCustomRepo
    });

    const result = await useCase.act(code);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
