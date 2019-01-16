import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAllNonFollowers,
  InstagramState
} from '../../reducers/instagram.reducer';
import { InstagramService } from '../../services/instragram.service';
import { LayoutState, isMenuOpen } from '../../reducers/layout.reducer';
import { MobileService } from '../../services/mobile/mobile.service';
import { CloseMenu } from '../../actions/layout.actions';
import {
  LoginSuccessAction,
  UpdateUnfollowersList
} from '../../actions/insagram.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  nonFollowers$ = this.instaStore.select(getAllNonFollowers);

  isMenuOpen$ = this.layoutStore.select(isMenuOpen);

  mode: string;

  constructor(
    private instaStore: Store<InstagramState>,
    private layoutStore: Store<LayoutState>,
    private mobileService: MobileService,
    private instagramService: InstagramService
  ) {
    this.mode = this.mobileService.isMobileDevice() ? 'over' : 'side';

    if (localStorage && localStorage.getItem('session')) {
      this.instaStore.dispatch(
        new LoginSuccessAction({ userSession: localStorage.getItem('session') })
      );
      // this.instagramService
      //   .fetchFollows('followings', localStorage.getItem('session'))
      //   .subscribe();
      // this.instagramService
      //   .fetchFollows('followers', localStorage.getItem('session'))
      //   .subscribe();
      this.instaStore.dispatch(
        new UpdateUnfollowersList({ ids: [], remove: true })
      );
    }
  }

  closeMenu() {
    this.layoutStore.dispatch(new CloseMenu());
  }
}
