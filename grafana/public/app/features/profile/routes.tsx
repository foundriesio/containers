import { uniq } from 'lodash';

import { SafeDynamicImport } from 'app/core/components/DynamicImports/SafeDynamicImport';
import { config } from 'app/core/config';
import { RouteDescriptor } from 'app/core/navigation/types';

const profileRoutes: RouteDescriptor[] = [
  {
    path: '/profile',
    component: SafeDynamicImport(
      () => import(/* webpackChunkName: "UserProfileEditPage" */ 'app/features/profile/UserProfileEditPage')
    ),
  },
  {
    path: '/profile/password',
    component: SafeDynamicImport(
      () => import(/* webPackChunkName: "ChangePasswordPage" */ 'app/features/profile/ChangePasswordPage')
    ),
  },
  {
    path: '/profile/select-org',
    component: SafeDynamicImport(
      () => import(/* webpackChunkName: "SelectOrgPage" */ 'app/features/org/SelectOrgPage')
    ),
  },
];

export function getProfileRoutes(cfg = config): RouteDescriptor[] {
  if (cfg.profileEnabled) {
    return profileRoutes;
  }

  const uniquePaths = uniq(profileRoutes.map((route) => route.path));
  return uniquePaths.map((path) => ({
    path,
    component: SafeDynamicImport(
      () => import(/* webpackChunkName: "Profile feature toggle page"*/ 'app/features/profile/FeatureTogglePage')
    ),
  }));
}
