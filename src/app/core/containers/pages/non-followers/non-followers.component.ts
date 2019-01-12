import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  transition,
  query,
  stagger,
  animateChild,
  style,
  animate
} from '@angular/animations';
import {
  InstagramState,
  getUserSession,
  getAllNonFollowers
} from 'src/app/core/reducers/instagram.reducer';
import { Store, select } from '@ngrx/store';
import { Unfollow } from 'src/app/core/actions/insagram.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'inf-non-followers',
  templateUrl: './non-followers.component.html',
  styleUrls: ['./non-followers.component.less'],
  animations: [
    // nice stagger effect when showing existing elements
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items', stagger(100, animateChild()))
      ])
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px'
          })
        )
      ])
    ])
  ]
})
export class NonFollowersComponent implements OnInit {
  userSession$ = this.store
    .pipe(
      select(getUserSession),
      tap(userSession => {
        this._userSession = userSession;
      })
    )
    .subscribe();

  _userSession: string;

  nonFollowers$ = this.store.select(getAllNonFollowers);

  constructor(private store: Store<InstagramState>) {}

  ngOnInit() {}

  unfollow(selected: any[]) {
    this.store.dispatch(
      new Unfollow({
        ids: selected.map(s => s.value.pk),
        userSession: this._userSession
      })
    );
  }
}
