import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { CategoryCreate } from '../../useCases/CategoryCreate';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { createCategorySchama } from '../../interface/http/validation';
import { CreateCategory as ICreateCategory } from '../../domain/vobjects';
import { CategoryRepository } from '../../../../repository/Category';

export class CreateCategory extends HttpRegular {
  private useCase: CategoryCreate;

  constructor() {
    super();
    this.useCase = new CategoryCreate({ categoryRepository: new CategoryRepository() });
  }

  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<ICreateCategory>(req);
      const newCategory = take.body();

      const validator = new HttpRequestValidator({ body: newCategory }, createCategorySchama);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }
      const authCerts = await this.checkAuth(req);

      if (!authCerts) {
        return this.unauthorized(res);
      }

      const result = await this.useCase.act(newCategory);

      if (result.isLeft()) {
        const error = result.value;
        this.fail(res, error.errorValue().message);
      } else {
        return this.created(res, result.value.getValue());
      }
    } catch (e) {
      console.log(e);
    }
  }
}
