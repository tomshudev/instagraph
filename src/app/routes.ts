import { Routes } from '@angular/router';
import { UsersListComponent } from './core/containers/users-list/users-list.component';
import { HomeComponent } from './core/containers/home/home.component';
import { FollowersComponent } from './core/containers/pages/followers/followers.component';
import { FollowingsComponent } from './core/containers/pages/followings/followings.component';
import { NonFollowersComponent } from './core/containers/pages/non-followers/non-followers.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: {} },
  { path: 'followers', component: FollowersComponent, pathMatch: 'full' },
  { path: 'followings', component: FollowingsComponent, pathMatch: 'full' },
  {
    path: 'non-followers',
    component: NonFollowersComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];
