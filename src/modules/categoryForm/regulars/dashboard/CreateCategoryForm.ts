import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { FormCategoryCreate } from '../../useCases/FormCategoryCreate';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { createCategoryFormSchama } from '../../interface/http/validation';

import { CreateCategoryForm as ICreateCategory } from '../../domain/vobjects';
import { CategoryFormRepository } from '../../../../repository/CategoryForm';
import { UpdateCategoryErrors } from '../../../category/domain/useCase/updateCategory/UpdateCategoryErrors';

export class CreateCategoryForm extends HttpRegular {
  private useCase: FormCategoryCreate;

  constructor() {
    super();
    this.useCase = new FormCategoryCreate({ categoryFormRepository: new CategoryFormRepository() });
  }

  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<ICreateCategory[]>(req);
      const newCategoryForm = take.body();
      const categoryId = take.params('id');
      const validator = new HttpRequestValidator(
        { body: newCategoryForm, params: { id: categoryId } },
        createCategoryFormSchama
      );
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }
      const authCerts = await this.checkAuth(req);

      if (!authCerts) {
        return this.unauthorized(res);
      }

      const result = await this.useCase.act(categoryId, newCategoryForm);
      const resultData = result.value;
      if (result.isLeft()) {
        switch (resultData.constructor) {
          case UpdateCategoryErrors.CategoryNotExistsError:
            return this.notFound(res, resultData.errorValue().message);
          default:
            return this.fail(res, resultData.errorValue().message);
        }
      } else {
        return this.created(res, resultData.getValue());
      }
    } catch (e) {
      console.log(e);
    }
  }
}
