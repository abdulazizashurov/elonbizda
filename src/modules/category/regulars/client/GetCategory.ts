import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { CategoryGet } from '../../useCases/CategoryGet';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { getCategorySchema } from '../../interface/http/validation';
import * as VO from '../../domain/vobjects';
import { CategoryRepository } from '../../../../repository/Category';
import { GetCategoryErorrs } from '../../domain/useCase/getCategory/GetCategoryErrors';

export class GetCategory extends HttpRegular {
  private useCase: CategoryGet;

  constructor() {
    super();
    this.useCase = new CategoryGet({ categoryRepository: new CategoryRepository() });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.GetCategory>(req);
      const categoryId = take.params('id');
      const validator = new HttpRequestValidator({ params: { id: categoryId } }, getCategorySchema);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }

      const result = await this.useCase.act(categoryId as string);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetCategoryErorrs.CategoryNotExistsError:
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
