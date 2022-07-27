// import { AuthMemRepository } from '../../../repository/memory/Auth';
import { JWTClaims } from '../domain/JWTClaims';
import { DecodedToken } from '../domain/vobjects';

export class AuthService {
  // private authRepository: AuthMemRepository;
  private jwt: JWTClaims;
  constructor() {
    // this.authRepository = new AuthMemRepository();
    this.jwt = new JWTClaims();
  }
  async checkToken(token: string): Promise<DecodedToken | null> {
    try {
      return await this.jwt.decodeToken(token);
    } catch (e) {
      console.log(e);
    }
  }
}
