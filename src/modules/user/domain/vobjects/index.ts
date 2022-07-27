import { UserGender } from '../../../../domain/entities/user/User';

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type VerifyUser = {
  code: string;
};

export type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  gender: UserGender;
  password: string;
  confirmPassword: string;
};
