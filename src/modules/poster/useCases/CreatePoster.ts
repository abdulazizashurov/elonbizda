import { UseCase } from '../../../core/UseCase';
import { Result, left, right } from '../../../core/Result';
import { AppError } from '../../../core/ApplicationError';

import { PosterCreate } from '../domain/vobjects';
import { PosterRepository } from '../../../repository/Poster';
import { Poster } from '../../../domain/entities/poster/Poster';
import { CreatePosterResponse } from '../domain/useCase/posterCreate/CreatePosterResponse';

export class CreatePoster implements UseCase<PosterCreate, Promise<CreatePosterResponse>, any> {
  private posterRepository: PosterRepository;

  constructor({ posterRepository }) {
    this.posterRepository = posterRepository;
  }
  async act(dataSource: PosterCreate): Promise<CreatePosterResponse> {
    try {
      const post = await this.posterRepository.create(dataSource);

      return right(Result.ok<Poster>(post) as any);
    } catch (e) {
      console.log(e);
      return left(new AppError.UnexpectedError(e));
    }
  }
}
