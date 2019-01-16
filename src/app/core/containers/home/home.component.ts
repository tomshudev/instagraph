import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getUserSession,
  InstagramState
} from '../../reducers/instagram.reducer';

@Component({
  selector: 'inf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  userSession$ = this.store.select(getUserSession);

  constructor(private store: Store<InstagramState>) {}

  ngOnInit() {}
}
