import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  InstagramState,
  getUserSession
} from '../../reducers/instagram.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'inf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  userID$ = this.store.pipe(
    select(getUserSession),
    tap(userID => {
      this._userID = userID;
    })
  );

  _userID: string;

  constructor(private store: Store<InstagramState>) {}

  ngOnInit() {}
}
