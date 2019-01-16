import { Component, OnInit, Input } from '@angular/core';
import { User, FollowType } from '../../models/user.model';
import {
  ConnectableObservable,
  Observable,
  Observer,
  Subscription,
  of
} from 'rxjs';
import { InstagramService } from '../../services/instragram.service';
import {
  InstagramState,
  getAllFollowers,
  getAllFollowings
} from '../../reducers/instagram.reducer';
import { Store, select } from '@ngrx/store';
import { tap, filter, map } from 'rxjs/operators';
import {
  IVirtualScrollOptions,
  ScrollObservableService
} from 'od-virtualscroll';
import {
  FetchFollowersSuccess,
  FetchFollowingsSuccess
} from '../../actions/insagram.actions';
import {
  trigger,
  transition,
  animate,
  style,
  query,
  stagger,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'inf-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less'],
  animations: [
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items', stagger(50, animateChild()))
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
export class UsersListComponent implements OnInit {
  @Input() type: string;

  @Input() userID: string;

  @Input() showButtons: boolean;

  selector$: Observable<any[]>;

  constructor(
    private instagramService: InstagramService,
    private store: Store<InstagramState>,
    private _scrollObs: ScrollObservableService
  ) {}

  ngOnInit() {
    this.selector$ =
      this.type === FollowType.FOLLOWER
        ? this.store.select(getAllFollowers)
        : this.store.select(getAllFollowings);
  }

  options$: Observable<IVirtualScrollOptions> = of({
    itemHeight: 45,
    numAdditionalRows: 1,
    numLimitColumns: 1
  });
}
