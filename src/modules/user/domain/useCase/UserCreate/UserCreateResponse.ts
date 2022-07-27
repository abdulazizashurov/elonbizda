import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { User } from '../../../../../domain/entities/user/User';

export type UserCreateResponse = Either<AppError.UnexpectedError | Result<any>, Result<User>>;
