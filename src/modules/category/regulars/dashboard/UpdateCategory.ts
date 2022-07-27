import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { updateCategoryNameSchema } from '../../interface/http/validation';
import * as VO from '../../domain/vobjects';
import { CategoryRepository } from '../../../../repository/Category';
import { CategoryUpdate } from '../../useCases/CategoryUpdate';
import { UpdateCategoryErrors } from '../../domain/useCase/updateCategory/UpdateCategoryErrors';

export class UpdateCategory extends HttpRegular {
  private useCase: CategoryUpdate;

  constructor() {
    super();
    this.useCase = new CategoryUpdate({ categoryRepository: new CategoryRepository() });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.UpdateCategory>(req);
      const updatedCategory = take.body();
      const categoryId = take.params('id');
      const validator = new HttpRequestValidator(
        { body: updatedCategory, params: { id: categoryId } },
        updateCategoryNameSchema
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
      const result = await this.useCase.act(updatedCategory, categoryId as string);
      if (result.value.getValue()) {
        this.notFound(res, 'Not found');
      }

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case UpdateCategoryErrors.CategoryNotExistsError:
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
