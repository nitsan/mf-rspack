import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'lead_form',
    loadChildren: () => import('lead_form/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
