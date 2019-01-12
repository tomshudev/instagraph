import { Component, OnInit } from '@angular/core';
import {
  getUserSession,
  InstagramState
} from 'src/app/core/reducers/instagram.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'inf-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.less']
})
export class FollowingsComponent implements OnInit {
  userSession$ = this.store.select(getUserSession);

  constructor(private store: Store<InstagramState>) {}

  ngOnInit() {}
}
