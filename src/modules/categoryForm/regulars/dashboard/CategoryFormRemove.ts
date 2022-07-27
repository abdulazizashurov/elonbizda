import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { RemoveCategroyForm } from '../../useCases/RemoveCategroyForm';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { removeCategoryFormSchema } from '../../interface/http/validation';
import { RemoveCategoryFormErrors } from '../../domain/useCase/categoryFormRemove/RemoveCategoryFormErrors';
import * as VO from '../../domain/vobjects';
import { CategoryFormRepository } from '../../../../repository/CategoryForm';

export class CategoryFormRemove extends HttpRegular {
  private useCase: RemoveCategroyForm;

  constructor() {
    super();
    this.useCase = new RemoveCategroyForm({ categoryFormRepository: new CategoryFormRepository() });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.RemoveCategroyForm>(req);
      const categoryId = take.params('id');

      const validator = new HttpRequestValidator({ params: { id: categoryId } }, removeCategoryFormSchema);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }

      const authCerts = await this.checkAuth(req);

      if (!authCerts) {
        return this.unauthorized(res);
      }

      const result = await this.useCase.act(categoryId as string);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case RemoveCategoryFormErrors.CategoryNotExistsError:
            return this.notFound(res, error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        return this.ok(res, (result as any).value.getValue());
      }
    } catch (e) {
      return this.fail(res, '');
    }
  }
}
