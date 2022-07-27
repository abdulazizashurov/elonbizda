import { AuthService } from '../../modules/authentication/services/Auth';
import { AuthMemRepository } from '../../repository/memory/Auth';
type DecodedToken = {
  id: string;
};
export class AuthN {
  private authnService: AuthService;
  private authRepository: AuthMemRepository;

  constructor() {
    this.authnService = new AuthService();
    this.authRepository = new AuthMemRepository();
  }
  async check(token): Promise<DecodedToken | null> {
    try {
      const decodedToken: DecodedToken = await this.authnService.checkToken(token);

      if (decodedToken) {
        const accessToken = await this.authRepository.getUserToken(decodedToken.id);
        if (accessToken.length > 0) {
          return decodedToken;
        }
        return null;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
