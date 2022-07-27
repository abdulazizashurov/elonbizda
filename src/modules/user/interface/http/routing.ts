import { HttpRouting } from '../../../../core/ExpressHttpRouting';
import { CreateUser } from '../../regulars/dashboard/CreateUser';
import { VerifyUser } from '../../regulars/clients/VerifyUser';
import { RegisterUser } from '../../regulars/clients/RegisterUser';
export default class UserRouting extends HttpRouting {
  constructor(path = '/') {
    super(path);
    this.router.route(this.prefix).post((req, res) => new CreateUser().act(req, res));
    this.router.route(`${this.prefix}/verify`).post((req, res) => new VerifyUser().act(req, res));
    this.router.route(`${this.prefix}/register`).post((req, res) => new RegisterUser().act(req, res));
  }
  routes() {
    return this.router;
  }
}
