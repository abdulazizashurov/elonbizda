import { Either, Result } from '../../../../../core/Result';
import { AppError } from '../../../../../core/ApplicationError';
import { User } from '../../../../../domain/entities/user/User';

export type UserRegisterResponse = Either<AppError.UnexpectedError | Result<any>, Result<User>>;
