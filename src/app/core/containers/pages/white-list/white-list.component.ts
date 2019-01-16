import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SelectionStatus } from '../non-followers/non-followers.component';
import { MatSelectionList } from '@angular/material/list';
import { RemoveFromWhiteList } from 'src/app/core/actions/insagram.actions';
import { Store } from '@ngrx/store';
import { InstagramState } from 'src/app/core/reducers/instagram.reducer';
import {
  trigger,
  transition,
  query,
  stagger,
  animateChild,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'inf-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.less'],
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
export class WhiteListComponent implements OnInit {
  whiteList: FormGroup;

  selectStatus: SelectionStatus = SelectionStatus.SELECT;

  @ViewChild('selections') selections: MatSelectionList;

  _whiteList: any;

  constructor(private store: Store<InstagramState>, private fb: FormBuilder) {
    this._whiteList = localStorage.getItem('whiteList')
      ? JSON.parse(localStorage.getItem('whiteList')).whiteList
      : [];
  }

  ngOnInit() {
    this.whiteList = this.fb.group({
      list: new FormControl('')
    });
  }

  removeFromWhiteList(selected: any[]) {
    this._whiteList = this._whiteList.filter(
      wl => !selected.find(s => s.value.pk === wl.pk)
    );
    this.store.dispatch(
      new RemoveFromWhiteList({ users: selected.map(s => s.value) })
    );
  }

  updateSelection(event) {
    this.selectStatus =
      this.selections.selectedOptions.selected.length === this._whiteList.length
        ? SelectionStatus.DESELECT
        : SelectionStatus.SELECT;
  }

  selectAll() {
    this.whiteList.controls.list.patchValue(
      this.selectStatus === SelectionStatus.SELECT ? [...this._whiteList] : []
    );
    this.selectStatus =
      this.selectStatus === SelectionStatus.SELECT
        ? SelectionStatus.DESELECT
        : SelectionStatus.SELECT;
  }
}
