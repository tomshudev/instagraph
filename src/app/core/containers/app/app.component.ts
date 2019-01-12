import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAllNonFollowers,
  InstagramState
} from '../../reducers/instagram.reducer';
import { InstagramService } from '../../services/instragram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  nonFollowers$ = this.store.select(getAllNonFollowers);

  constructor(
    private store: Store<InstagramState>,
    private instagramService: InstagramService
  ) {}

  unfollow(ids: number[]) {
    // this.store.dispatch(new Unfollow({ userSession: this._userID, ids: ids }));
  }
}
