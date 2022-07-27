// application shared dependencies
import { UseCase } from '../../../core/UseCase';
import { AuthMemRepository } from '../../../repository/memory/Auth';

// module dependencies
import * as VO from '../domain/vobjects';
import { PassworService } from '../services/Password';
import { UserService } from '../services/User';
import { JWTService } from '../services/Jwt';

export class PasswordlessAuth implements UseCase<VO.PasswordlessLogin, any, any> {
  private authRepository: AuthMemRepository;
  private passworService: PassworService;
  private userService: UserService;
  private jwtService: JWTService;
  constructor({ authRepository, passwodService, userService, jwtService }) {
    this.authRepository = authRepository;
    this.passworService = passwodService;
    this.userService = userService;
    this.jwtService = jwtService;
  }
  async act(dataSource: VO.PasswordlessLogin) {
    try {
      // find user by phoneNumber
      const record = await this.userService.findByPhoneNumber(dataSource.phoneNumber);
      if (!record) {
        return false;
      }
      const validPwd = await this.passworService.compare(dataSource.password, record.password);

      if (!validPwd) {
        return false;
      }

      const accessToken = this.jwtService.createAccessToken({ id: record.id });
      const refreshToken = this.jwtService.createRefreshToken();

      await this.authRepository.addToken(record.id, refreshToken, accessToken);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = record;
      return { user, tokens: { accessToken, refreshToken } };
    } catch (e) {
      throw new Error(e);
    }
  }
}
