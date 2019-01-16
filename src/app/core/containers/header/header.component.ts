import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToggleMenu } from '../../actions/layout.actions';
import { isMenuOpen, LayoutState } from '../../reducers/layout.reducer';

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
