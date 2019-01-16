import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  TOGGLE_MENU = '[Layout] Toggle menu',
  CLOSE_MENU = '[Layout] Close menu'
}

export class ToggleMenu implements Action {
  readonly type = LayoutActionTypes.TOGGLE_MENU;
}

export class CloseMenu implements Action {
  readonly type = LayoutActionTypes.CLOSE_MENU;
}

export type LayoutActions = ToggleMenu | CloseMenu;
