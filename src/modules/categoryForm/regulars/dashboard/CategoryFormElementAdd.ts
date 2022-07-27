import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { addCategoryElementSchama } from '../../interface/http/validation';

import { CategoryFormElement as IAddCategoryElement } from '../../domain/vobjects';
import { CategoryFormRepository } from '../../../../repository/CategoryForm';
import { AddCategoryElementErrors } from '../../domain/useCase/categoryAddElement/AddCategoryElementErrors';
import { AddCategoryForm } from '../../useCases/AddCategoryForm';

export class CategoryFormElementAdd extends HttpRegular {
  private useCase: AddCategoryForm;

  constructor() {
    super();
    this.useCase = new AddCategoryForm({ categoryFormRepository: new CategoryFormRepository() });
  }

  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<IAddCategoryElement>(req);
      const newElement = take.body();
      const categoryId = take.params('id');
      const validator = new HttpRequestValidator(
        { body: newElement, params: { id: categoryId } },
        addCategoryElementSchama
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

      const result = await this.useCase.act(categoryId, newElement);
      const resultData = result.value;
      if (result.isLeft()) {
        switch (resultData.constructor) {
          case AddCategoryElementErrors.CategoryNotExistsError:
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
