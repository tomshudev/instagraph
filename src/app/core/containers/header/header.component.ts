import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutState, isMenuOpen } from '../../reducers/layout.reducer';
import { ToggleMenu } from '../../actions/layout.actions';

@Component({
  selector: 'inf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isMenuOpen$ = this.layoutStore.select(isMenuOpen);

  constructor(private layoutStore: Store<LayoutState>) {}

  ngOnInit() {}

  toggleMenu() {
    this.layoutStore.dispatch(new ToggleMenu());
  }
}
