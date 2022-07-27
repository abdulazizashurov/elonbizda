import { HttpRouting } from '../../../../core/ExpressHttpRouting';
import { CategoryFormRemove } from '../../regulars/dashboard/CategoryFormRemove';
import { CreateCategoryForm } from '../../regulars/dashboard/CreateCategoryForm';
import { CategoryFormElementAdd } from '../../regulars/dashboard/CategoryFormElementAdd';

export default class CategoryFormDashboardRouting extends HttpRouting {
  constructor(path = '/') {
    super(path);

    this.router.route(this.prefix).delete((req, res) => new CategoryFormRemove().act(req, res));
    this.router.route(this.prefix).post((req, res) => new CreateCategoryForm().act(req, res));
    this.router.route(`${this.prefix}/element`).post((req, res) => new CategoryFormElementAdd().act(req, res));
  }
  routes() {
    return this.router;
  }
}
