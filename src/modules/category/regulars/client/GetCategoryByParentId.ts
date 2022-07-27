import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { CatregoryGetByParentId } from '../../useCases/CatregoryGetByParentId';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { getCategorySchema } from '../../interface/http/validation';
import * as VO from '../../domain/vobjects';
import { CategoryRepository } from '../../../../repository/Category';

export class GetCategoryByParentId extends HttpRegular {
  private useCase: CatregoryGetByParentId;

  constructor() {
    super();
    this.useCase = new CatregoryGetByParentId({ categoryRepository: new CategoryRepository() });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<VO.GetCategory>(req);
      const parentId = take.params('id');
      const validator = new HttpRequestValidator({ params: { id: parentId } }, getCategorySchema);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }

      const result = await this.useCase.act(parentId as string);
      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.errorValue().message);
      } else {
        return this.ok(res, (result as any).value.getValue());
      }
    } catch (e) {
      return this.fail(res, '');
    }
  }
}
