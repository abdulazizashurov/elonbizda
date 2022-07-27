import { Router } from 'express';
import { HttpRouting } from '../../../../core/ExpressHttpRouting';

import { PasswordlessAuth } from '../../regulars/PasswordlessAuth';

export default class AuthRouting extends HttpRouting {
  constructor(path = '/') {
    super(path);
    this.router.route(`${this.prefix}/login`).post((req, res) => new PasswordlessAuth().act(req, res));
  }
  routes(): Router {
    return this.router;
  }
}
