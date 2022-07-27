import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { UserRepository } from '../../../../repository/User';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { registerUserSchama } from '../../interface/http/validation';
import { VerficationService } from '../../services/Verfication';

import * as VO from '../../domain/vobjects';
import { UserRegister } from '../../useCases/UserRegister';
import CodeGenerator from '../../domain/CodeGenerator';

export class RegisterUser extends HttpRegular {
  private useCase: UserRegister;

  constructor() {
    super();
    this.useCase = new UserRegister({
      userRepository: new UserRepository(),
      verficationService: new VerficationService(),
      codeGenerator: new CodeGenerator()
    });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.RegisterUser>(req);
      const newUser = take.body();
      const validator = new HttpRequestValidator({ body: newUser }, registerUserSchama);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }
      const result = await this.useCase.act(newUser);
      const resultData = result.value;
      if (result.isLeft()) {
        this.conflict(res, resultData.errorValue().message);
      } else {
        return this.created(res, resultData.getValue());
      }
    } catch (e) {
      console.log(e);
    }
  }
}
