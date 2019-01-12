import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './containers/app/app.component';
import { LoginModule } from '../features/login/login.module';
import { instagramReducer } from './reducers/instagram.reducer';
import { StoreModule } from '@ngrx/store';
import { InstagramEffects } from './effects/instagram.effects';
import { EffectsModule } from '@ngrx/effects';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { MatListModule } from '@angular/material/list';
import { InstagramService } from './services/instragram.service';
import { VirtualScrollModule } from 'od-virtualscroll';
import { UserItemComponent } from './components/user-item/user-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../routes';
import { HomeComponent } from './containers/home/home.component';
import { FollowersComponent } from './containers/pages/followers/followers.component';
import { FollowingsComponent } from './containers/pages/followings/followings.component';
import { NonFollowersComponent } from './containers/pages/non-followers/non-followers.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    BrowserModule,
    VirtualScrollModule,
    RouterModule,
    StoreModule.forRoot({ instagram: instagramReducer }),
    EffectsModule.forRoot([InstagramEffects])
  ],
  providers: [InstagramService],
  declarations: [
    AppComponent,
    HomeComponent,
    UsersListComponent,
    UserItemComponent,
    NonFollowersComponent,
    FollowersComponent,
    FollowingsComponent
  ],
  exports: [AppComponent]
})
export class CoreModule {}
