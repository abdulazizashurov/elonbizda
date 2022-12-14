import { DecodedRequest } from '../../domain/DecodedRequest';
import { Request } from 'express';

// TODO: Fix type issues
export class Take<T> {
  private request: DecodedRequest | Request;

  constructor(req: DecodedRequest | Request) {
    this.request = req;
  }

  body(key?: string): T {
    return key ? this.request.body[key] : this.request.body;
  }
  query(key?: string) {
    return key ? this.request.query[key] : this.request.query;
  }
  params(key?: string) {
    return key ? this.request.params[key] : this.request.params;
  }

  headers(key?: string) {
    return key ? this.request.headers[key] : this.request.headers;
  }
}
