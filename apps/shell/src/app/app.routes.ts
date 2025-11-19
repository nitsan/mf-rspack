import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'guides',
    loadChildren: () => import('guides/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'hub',
    loadChildren: () => import('hub/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
