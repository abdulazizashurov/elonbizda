import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { CategoryRepository } from '../../../../repository/Category';
import { MainCategoryGet } from '../../useCases/MainCategoryGet';

export class GetMainCategories extends HttpRegular {
  private useCase: MainCategoryGet;

  constructor() {
    super();
    this.useCase = new MainCategoryGet({ categoryRepository: new CategoryRepository() });
  }
  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const result = await this.useCase.act();

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
