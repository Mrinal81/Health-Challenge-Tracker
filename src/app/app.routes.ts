import { Routes } from '@angular/router';
import { UserInputComponent } from './user-input/user-input.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChartComponent } from './chart/chart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/input', pathMatch: 'full' },
  { path: 'input', component: UserInputComponent },
  { path: 'list', component: UserListComponent },
  { path: 'chart', component: ChartComponent }
];
