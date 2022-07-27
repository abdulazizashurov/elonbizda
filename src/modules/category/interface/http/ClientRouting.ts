import { HttpRouting } from '../../../../core/ExpressHttpRouting';
import { GetMainCategories } from '../../regulars/client/GetMainCategory';
import { GetCategory } from '../../regulars/client/GetCategory';
import { GetCategoryByParentId } from '../../regulars/client/GetCategoryByParentId';

export default class CategoryClientRouting extends HttpRouting {
  constructor(path = '/') {
    super(path);

    this.router.route(`${this.prefix}/head`).get((req, res) => new GetMainCategories().act(req, res));

    this.router.route(`${this.prefix}/:id`).get((req, res) => new GetCategory().act(req, res));

    this.router.route(`${this.prefix}/:id/children`).get((req, res) => new GetCategoryByParentId().act(req, res));
  }
  routes() {
    return this.router;
  }
}
