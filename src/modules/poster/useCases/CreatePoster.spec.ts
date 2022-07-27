import 'jest-extended';
import { AppError } from '../../../core/ApplicationError';
import { CreatePoster } from './CreatePoster';
import { CurrencyType } from '../../../domain/entities/poster/enums';

describe('Create poster usecase', () => {
  const post = {
    title: 'Test',
    description: 'Test',
    price: 100,
    exchange: true,
    currency: CurrencyType.USD,
    used: true,
    location: {
      map: {
        lon: '1',
        lat: '2'
      },
      address: 'Tashkent'
    },
    email: 'ashurov635@gmail.com',
    phoneNumber: '998917934366',
    agreement: true,
    additionalInformations: null
  };
  const returnedPost = {
    _id: '627ba0c65740e1089f24b2a8',
    title: 'Test',
    price: 100,
    used: true,
    email: 'ashurov635@gmail.com',
    phoneNumber: '998917934366',
    agreement: true,
    additionalInformations: null,
    isActive: true,
    views: 0,
    publishedAt: 1
  };

  it('Should successfull create post with custom mock repo', async () => {
    const mockCustomRepo = {
      async create(post) {
        return returnedPost;
      }
    };

    const useCase = new CreatePoster({
      posterRepository: mockCustomRepo
    });

    const result = await useCase.act(post);
    expect(result.isRight()).toBe(true);
    const value: any = result.value.getValue();
    expect(value).toStrictEqual(returnedPost);
  });

  it('Should post usecase error when repository return exeption', async () => {
    const mockCustomRepo = {
      async create(post) {
        throw new Error('Mock Error');
      }
    };
    const useCase = new CreatePoster({
      posterRepository: mockCustomRepo
    });

    const result = await useCase.act(post);
    expect(result.isLeft()).toBe(true);
    const error = result.value;
    expect(error).toBeInstanceOf(AppError.UnexpectedError);
  });
});
