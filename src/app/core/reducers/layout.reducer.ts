import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export type LayoutState = {
  isMenuOpen: boolean;
};

export const initialState: LayoutState = {
  isMenuOpen: false
};

export function layoutReducer(
  state = initialState,
  action: LayoutActions
): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.TOGGLE_MENU: {
      return { ...state, isMenuOpen: !state.isMenuOpen };
    }

    case LayoutActionTypes.CLOSE_MENU: {
      return { ...state, isMenuOpen: false };
    }

    default:
      return state;
  }
}

export const getState = createFeatureSelector<LayoutState>('layout');

export const isMenuOpen = createSelector(
  getState,
  (state: LayoutState) => state.isMenuOpen
);
