import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VirtualScrollModule } from 'od-virtualscroll';
import { LoginModule } from '../features/login/login.module';
import { UserItemComponent } from './components/user-item/user-item.component';
import { AppComponent } from './containers/app/app.component';
import { HeaderComponent } from './containers/header/header.component';
import { HomeComponent } from './containers/home/home.component';
import { FollowersComponent } from './containers/pages/followers/followers.component';
import { FollowingsComponent } from './containers/pages/followings/followings.component';
import { NonFollowersComponent } from './containers/pages/non-followers/non-followers.component';
import { WhiteListComponent } from './containers/pages/white-list/white-list.component';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { InstagramEffects } from './effects/instagram.effects';
import { instagramReducer } from './reducers/instagram.reducer';
import { layoutReducer } from './reducers/layout.reducer';
import { InstagramService } from './services/instragram.service';

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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forRoot({ instagram: instagramReducer, layout: layoutReducer }),
    EffectsModule.forRoot([InstagramEffects])
  ],
  providers: [InstagramService],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UsersListComponent,
    UserItemComponent,
    NonFollowersComponent,
    FollowersComponent,
    FollowingsComponent,
    WhiteListComponent
  ],
  exports: [AppComponent]
})
export class CoreModule {}
