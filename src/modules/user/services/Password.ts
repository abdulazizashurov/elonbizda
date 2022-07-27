import UserPassword from '../domain/UserPassword';

export class Password {
  async compare(passwod: string, hashedPassword: string) {
    return await UserPassword.checkUserPassword(passwod, hashedPassword);
  }
}
