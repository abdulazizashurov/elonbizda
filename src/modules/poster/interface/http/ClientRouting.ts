import { HttpRouting } from '../../../../core/ExpressHttpRouting';
import { PosterCreate } from '../../regulars/client/PosterCreate';

export default class PosterClientRouting extends HttpRouting {
  constructor(path = '/') {
    super(path);
    this.router.route(this.prefix).post((req, res) => new PosterCreate().act(req, res));
  }
  routes() {
    return this.router;
  }
}
