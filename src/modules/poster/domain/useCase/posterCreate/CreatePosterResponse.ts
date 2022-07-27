import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { Poster } from '../../../../../domain/entities/poster/Poster';

export type CreatePosterResponse = Either<AppError.UnexpectedError | Result<any>, Result<Poster>>;
