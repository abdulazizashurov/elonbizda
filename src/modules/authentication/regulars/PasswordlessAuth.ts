// external npm dependencies
import { Response } from 'express';
// application shared dependencies
import { DecodedRequest } from '../../../domain/DecodedRequest';
import { HttpRegular } from '../../../core/HttpRegular';
import { HttpRequestValidator } from '../../../shared/validators/HttpRequestValidator';
import { AuthMemRepository } from '../../../repository/memory/Auth';
import { Take } from '../../../interfaces/http/Take';
// module dependencies
import { loginSchema } from '../interface/http/validation';
import { PassworService } from '../services/Password';
import { PasswordlessAuth as PasswordlessAuthUseCase } from '../useCases/PasswordlessAuth';
import { UserService } from '../services/User';
import { JWTService } from '../services/Jwt';
import * as VO from '../domain/vobjects';
export class PasswordlessAuth extends HttpRegular {
  private useCase: PasswordlessAuthUseCase;
  constructor() {
    super();
    this.useCase = new PasswordlessAuthUseCase({
      authRepository: new AuthMemRepository(),
      passwodService: new PassworService(),
      userService: new UserService(),
      jwtService: new JWTService()
    });
  }
  async actImpl(req: DecodedRequest, res: Response): Promise<any> {
    try {
      const decodedRequest = new Take<VO.PasswordlessLogin>(req);
      const body = decodedRequest.body();
      const validator = new HttpRequestValidator({ body }, loginSchema);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }
      const result = await this.useCase.act(body);
      this.ok(res, result);
    } catch (e) {
      console.log(e);
    }
  }
}
