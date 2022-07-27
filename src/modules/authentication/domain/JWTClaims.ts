import * as jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import ApplicationContainer from '../../../app';
import { DecodedToken } from './vobjects';
export class JWTClaims {
  private jwtSecret: string;
  private jwtExpiresIn: string;

  constructor() {
    this.jwtSecret = ApplicationContainer.resolve('config').application.jwt.secret;
    this.jwtExpiresIn = ApplicationContainer.resolve('config').application.jwt.expires;
  }

  createRefreshToken(): string {
    return randtoken.uid(256);
  }

  createAccessToken(calims: any): string {
    const expiresIn = this.jwtExpiresIn;
    return jwt.sign(calims, this.jwtSecret, { expiresIn });
  }

  decodeToken(token: string): Promise<DecodedToken | null> {
    return new Promise((resolve) => {
      jwt.verify(token, this.jwtSecret, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded as any);
      });
    });
  }
}
