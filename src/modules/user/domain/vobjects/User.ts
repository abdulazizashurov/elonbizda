import { User as UserModel, UserGender } from '../../../../domain/entities/user/User';
export class User {
  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private phoneNumber: string;
  private createdAt: Date;
  private updatedAt: Date;
  private verified: boolean;
  private verificationCode: string;
  private avatar: string;
  private password: string;
  private salt: string;
  private gender: UserGender;
  constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.verified = user.verified;
    this.verificationCode = user.verificationCode;
    this.avatar = user.avatar;
    this.password = user.password;
    this.salt = user.salt;
    this.gender = user.gender;
  }
  withoutSecrets() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      avatar: this.avatar,
      gender: this.gender
    } as UserModel;
  }
}
