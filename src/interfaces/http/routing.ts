import { Router, json, urlencoded } from 'express';
import cors from 'cors';

import SwaggerDocs from './swagger/docs';

import UserRoutes from '../../modules/user/interface/http/routing';
import AuthRoutes from '../../modules/authentication/interface/http/routing';
import CategoryFormRoutes from '../../modules/categoryForm/interface/http/DashboardRouting';

import CategoryDashboardRouting from '../../modules/category/interface/http/DashboardRouting';
import CategoryClientRouting from '../../modules/category/interface/http/ClientRouting';

import PosterClientRouting from '../../modules/poster/interface/http/ClientRouting';

export class ExpressRouter {
  private router: Router;
  constructor(app) {
    this.router = Router({ mergeParams: true });
    this.router.use(json());
    this.router.use(urlencoded());
    this.router.use(cors());
    // this.router.use('/status', (req, res) => {
    //   res.send('hello');
    // });

    this.router.use('/', SwaggerDocs);
    // this.router.use('/client', ClientDocs);

    const categoryFormRoutes: CategoryFormRoutes = new CategoryFormRoutes('/categories/:id/additional-forms');
    this.router.use('/dashboard', categoryFormRoutes.routes());

    const categoryDashboardRoutes: CategoryDashboardRouting = new CategoryDashboardRouting('/categories');
    this.router.use('/dashboard', categoryDashboardRoutes.routes());

    const categoryClientRoutes: CategoryClientRouting = new CategoryClientRouting('/categories');
    this.router.use(categoryClientRoutes.routes());

    const posterClientRoutes: PosterClientRouting = new PosterClientRouting('/posters');
    this.router.use(posterClientRoutes.routes());

    const userRoutes: UserRoutes = new UserRoutes('/users');
    const authRoutes: AuthRoutes = new AuthRoutes('/auth');

    this.router.use(userRoutes.routes());
    this.router.use(authRoutes.routes());

    app.use(this.router);
  }
  routing = () => {
    return this.router;
  };
}
