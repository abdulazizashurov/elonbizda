import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { CategoryRepository } from '../../../../repository/Category';
import { CategoryDelete } from '../../useCases/CategoryDelete';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { deleteCategorySchema } from '../../interface/http/validation';
import { DeleteCategoryErrors } from '../../domain/useCase/deleteCategory/DeleteCategoryErrors';
import * as VO from '../../domain/vobjects';

export class DeleteCategory extends HttpRegular {
  private useCase: CategoryDelete;

  constructor() {
    super();
    this.useCase = new CategoryDelete({ categoryRepository: new CategoryRepository() });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.DeleteCategory>(req);
      const categoryId = take.params('id');

      const validator = new HttpRequestValidator({ params: { id: categoryId } }, deleteCategorySchema);
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
          case DeleteCategoryErrors.CategoryNotExistsError:
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
