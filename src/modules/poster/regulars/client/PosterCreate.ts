import { Response } from 'express';
import { DecodedRequest } from '../../../../domain/DecodedRequest';
import { HttpRegular } from '../../../../core/HttpRegular';
import { Take } from '../../../../interfaces/http/Take';
import { HttpRequestValidator } from '../../../../shared/validators/HttpRequestValidator';
import { PosterCreate as ICreatePoster } from '../../domain/vobjects';
import { PosterRepository } from '../../../../repository/Poster';
import { createPosterSchama } from '../../interface/http/validations';
import { CreatePoster } from '../../useCases/CreatePoster';

export class PosterCreate extends HttpRegular {
  private useCase: CreatePoster;

  constructor() {
    super();
    this.useCase = new CreatePoster({ posterRepository: new PosterRepository() });
  }

  async actImpl(req: DecodedRequest, res: Response) {
    try {
      const take = new Take<ICreatePoster>(req);
      const newPost = take.body();
      const validator = new HttpRequestValidator({ body: newPost }, createPosterSchama);
      const isValid = await validator.validate();
      if (!isValid) {
        const validationErrors = await validator.errors();
        return this.validationError(res, validationErrors);
      }
      const result = await this.useCase.act(newPost);
      const resultData = result.value;
      if (result.isLeft()) {
        this.fail(res, resultData.errorValue().message);
      } else {
        return this.created(res, resultData.getValue());
      }
    } catch (e) {
      console.log(e);
    }
  }
}
