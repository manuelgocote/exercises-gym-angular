import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGuard } from './core/guards/public.guard';
import { TrainingEditComponent } from './features/training/training-edit/training-edit.component';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/calendar/calendar.component').then(
        (m) => m.CalendarComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [PublicGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [PublicGuard],
  },
  {
    path: 'training/:date',
    loadComponent: () =>
      import('./features/training/training-detail/training-detail.component').then(
        (m) => m.TrainingDetailComponent
      ),
  },
  {
    path: 'edit-training/:date',
    loadComponent: () =>
      import('./features/training/training-edit/training-edit.component').then(
        (m) => m.TrainingEditComponent
      ),
  },
  {
    path: 'add-training/:date',
    loadComponent: () =>
      import('./features/training/training-add/training-add.component').then(
        (m) => m.TrainingAddComponent
      ),
  },
];
