import { Request, Response } from 'express';
import { AuthN } from '../shared/authn';
import { ResponseMessage } from '../domain/http/Response';
export abstract class HttpRegular {
  private authN: AuthN;

  constructor() {
    this.authN = new AuthN();
  }
  protected async checkAuth(req: Request) {
    return await this.authN.check(req.headers.authorization || req.headers['authorization']);
  }

  protected abstract actImpl(req: Request, res: Response): Promise<void | any>;

  private jsonResponse(res: Response, code: number, body: object) {
    return res.status(code).json(body);
  }

  public async act(req: Request, res: Response) {
    try {
      await this.actImpl(req, res);
    } catch (e) {
      console.log(e);
    }
  }

  public ok<T>(res: Response, dataSource?: T) {
    res.type('application/json');

    const body = {
      msgCode: ResponseMessage.OK,
      message: 'ok',
      data: dataSource ? dataSource : {}
    };

    this.jsonResponse(res, 200, body);
  }
  public created<T>(res: Response, dataSource?: T) {
    res.type('application/json');

    const body = {
      msgCode: ResponseMessage.CREATED,
      message: 'Created',
      data: dataSource ? dataSource : {}
    };

    this.jsonResponse(res, 201, body);
  }

  public clientError(res: Response, message?: string) {
    const body = {
      msgCode: ResponseMessage.BAD_REQUEST,
      message: message ? message : 'Bad Request',
      data: {}
    };

    this.jsonResponse(res, 400, body);
  }

  public unauthorized(res: Response, message?: string) {
    const body = {
      msgCode: ResponseMessage.UNAUTHORIZED,
      message: message ? message : 'Unauthorized',
      data: {}
    };

    return this.jsonResponse(res, 401, body);
  }

  public forbidden(res: Response, message?: string) {
    const body = {
      msgCode: ResponseMessage.FORBIDDEN,
      message: message ? message : 'Forbidden',
      data: {}
    };

    return this.jsonResponse(res, 403, body);
  }

  public notFound(res: Response, message?: string) {
    const body = {
      msgCode: ResponseMessage.NOT_FOUND,
      message: message ? message : 'Not Found',
      data: {}
    };

    return this.jsonResponse(res, 404, body);
  }

  public conflict(res: Response, message?: string) {
    const body = {
      msgCode: ResponseMessage.CONFLICT,
      message: message ? message : 'Conflict',
      data: {}
    };

    return this.jsonResponse(res, 409, body);
  }

  public fail(res: Response, error: Error | string) {
    const body = {
      msgCode: ResponseMessage.INTERNAL_SERVER_ERROR,
      message: error ? error.toString() : 'Internal Server Error',
      data: {}
    };

    return this.jsonResponse(res, 500, body);
  }

  public validationError(res: Response, errors: any) {
    const body = {
      msgCode: ResponseMessage.UNPROCESSABLE_ENTITY,
      message: 'Validation Error',
      errors
    };

    return this.jsonResponse(res, 422, body);
  }
}

// TODO: domain ichidagi enumlarni message o'rniga o'zgartirish kere
