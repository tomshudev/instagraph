import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
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
import {
  Unfollow,
  SaveToWhiteList
} from 'src/app/core/actions/insagram.actions';
import { tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';

export enum SelectionStatus {
  SELECT = 'Select',
  DESELECT = 'Deselect'
}

@Component({
  selector: 'inf-non-followers',
  templateUrl: './non-followers.component.html',
  styleUrls: ['./non-followers.component.less'],
  animations: [
    // nice stagger effect when showing existing elements
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
export class NonFollowersComponent implements OnInit {
  nonFollowers: FormGroup;

  selectStatus: SelectionStatus = SelectionStatus.SELECT;

  @ViewChild('selections') selections: MatSelectionList;

  userSession$ = this.store
    .pipe(
      select(getUserSession),
      tap(userSession => {
        this._userSession = userSession;
      })
    )
    .subscribe();

  nonFollowers$ = this.store.pipe(
    select(getAllNonFollowers),
    tap(d => (this._nonFollowers = d))
  );

  _userSession: string;
  _nonFollowers: any[];

  constructor(private store: Store<InstagramState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.nonFollowers$.subscribe();
    this.nonFollowers = this.fb.group({
      list: new FormControl('')
    });
  }

  unfollow(selected: any[]) {
    this.store.dispatch(
      new Unfollow({
        ids: selected.map(s => s.value.pk),
        userSession: this._userSession
      })
    );
  }

  saveToWhiteList(selected: any[]) {
    this.store.dispatch(
      new SaveToWhiteList({ users: selected.map(s => s.value) })
    );
  }

  updateSelection(event) {
    this.selectStatus =
      this.selections.selectedOptions.selected.length ===
      this._nonFollowers.length
        ? SelectionStatus.DESELECT
        : SelectionStatus.SELECT;
  }

  selectAll() {
    this.nonFollowers.controls.list.patchValue(
      this.selectStatus === SelectionStatus.SELECT
        ? [...this._nonFollowers]
        : []
    );
    this.selectStatus =
      this.selectStatus === SelectionStatus.SELECT
        ? SelectionStatus.DESELECT
        : SelectionStatus.SELECT;
  }
}
