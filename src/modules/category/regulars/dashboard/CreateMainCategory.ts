import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { MainCategoryCreate } from '../../useCases/MainCategoryCreate';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { createMainCategorySchama } from '../../interface/http/validation';
import * as VO from '../../domain/vobjects';
import { CategoryRepository } from '../../../../repository/Category';

export class CreateMainCategory extends HttpRegular {
  private useCase: MainCategoryCreate;

  constructor() {
    super();
    this.useCase = new MainCategoryCreate({ categoryRepository: new CategoryRepository() });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.MainCreateCategory>(req);
      const newMainCategory = take.body();
      const validator = new HttpRequestValidator({ body: newMainCategory }, createMainCategorySchama);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }
      const authCerts = await this.checkAuth(req);

      if (authCerts) {
        return this.unauthorized(res);
      }

      const result = await this.useCase.act({ ...newMainCategory, isHead: true });

      if (result.isLeft()) {
        const error = result.value;
        this.fail(res, error.errorValue().message);
      } else {
        return this.created(res, (result as any).value.getValue());
      }
    } catch (e) {
      console.log(e);
    }
  }
}
