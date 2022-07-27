import { HttpRouting } from '../../../../core/ExpressHttpRouting';
import { CreateCategory } from '../../regulars/dashboard/CreateCategory';
import { DeleteCategory } from '../../regulars/dashboard/DeleteCategory';
import { CreateMainCategory } from '../../regulars/dashboard/CreateMainCategory';
import { UpdateCategory } from '../../regulars/dashboard/UpdateCategory';

export default class CategoryDashboardRouting extends HttpRouting {
  constructor(path = '/') {
    super(path);
    this.router.route(this.prefix).post((req, res) => new CreateCategory().act(req, res));
    this.router.route(`${this.prefix}/head`).post((req, res) => new CreateMainCategory().act(req, res));

    this.router
      .route(`${this.prefix}/:id`)
      .put((req, res) => new UpdateCategory().act(req, res))
      .delete((req, res) => new DeleteCategory().act(req, res));
  }
  routes() {
    return this.router;
  }
}
