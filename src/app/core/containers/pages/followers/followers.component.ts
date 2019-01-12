import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  InstagramState,
  getUserSession
} from 'src/app/core/reducers/instagram.reducer';

@Component({
  selector: 'inf-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.less']
})
export class FollowersComponent implements OnInit {
  userSession$ = this.store.select(getUserSession);

  constructor(private store: Store<InstagramState>) {}

  ngOnInit() {}
}
