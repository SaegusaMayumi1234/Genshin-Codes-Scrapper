import { Router } from 'express';

import GenshinCodesRoute from './genshin-codes.routes';

const router = Router();

const defaultRoutes = [
  {
    path: '/genshin-codes',
    route: GenshinCodesRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
