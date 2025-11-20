import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'hub',
    loadChildren: () => import('hub/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'guides',
    loadChildren: () => import('guides/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
