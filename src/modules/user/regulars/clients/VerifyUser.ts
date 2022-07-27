import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { UserRepository } from '../../../../repository/User';
import { UserVerify } from '../../useCases/UserVerify';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { verifyUserSchama } from '../../interface/http/validation';

import * as VO from '../../domain/vobjects';

export class VerifyUser extends HttpRegular {
  private useCase: UserVerify;

  constructor() {
    super();
    this.useCase = new UserVerify({
      userRepository: new UserRepository()
    });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.VerifyUser>(req);
      const code = take.body();
      const validator = new HttpRequestValidator({ body: code }, verifyUserSchama);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }
      const result = await this.useCase.act(code);

      if (result.isLeft()) {
        const error = result.value;
        return this.conflict(res, error.errorValue().message);
      } else {
        return this.ok(res, (result as any).value.getValue());
      }
    } catch (e) {
      return this.fail(res, '');
    }
  }
}
