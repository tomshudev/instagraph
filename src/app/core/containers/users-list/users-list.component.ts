import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IVirtualScrollOptions } from 'od-virtualscroll';
import { Observable, of } from 'rxjs';
import { listAnimations } from 'src/app/shared/list.animations';
import { FollowType } from '../../models/user.model';
import {
  getAllFollowers,
  getAllFollowings,
  InstagramState
} from '../../reducers/instagram.reducer';

@Component({
  selector: 'inf-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less'],
  animations: listAnimations
})
export class UsersListComponent implements OnInit {
  @Input() type: string;

  @Input() userSession: string;

  @Input() showButtons: boolean;

  selector$: Observable<any[]>;

  constructor(private store: Store<InstagramState>) {}

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
