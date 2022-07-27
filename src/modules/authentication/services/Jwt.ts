import { JWTClaims } from '../domain/JWTClaims';

export class JWTService {
  private jwt: JWTClaims;
  constructor() {
    this.jwt = new JWTClaims();
  }
  createAccessToken(data: any) {
    return this.jwt.createAccessToken(data);
  }
  createRefreshToken() {
    return this.jwt.createRefreshToken();
  }
}
