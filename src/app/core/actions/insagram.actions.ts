import { Action } from '@ngrx/store';

export enum InstagramActionTypes {
  LOGIN = '[INSTAGRAM] login',
  LOGIN_SUCCESS = '[INSTAGRAM] login success',
  GET_ALL_FOLLOWERS = '[INSTAGRAM] get all followers',
  GET_ALL_FOLLOWINGS = '[INSTAGRAM] get all followings',
  FETCH_FOLLOWERS_SUCCESS = '[INSTAGRAM] fetch followers success',
  FETCH_FOLLOWINGS_SUCCESS = '[INSTAGRAM] fetch followings success',
  UNFOLLOW = '[INSTAGRAM] unfollow',
  UPDATE_UNFOLLOWERS = '[INSTAGRAM] unfollow success',
  UPDATE_UNFOLLOWERS_LIST = '[INSTAGRAM] update unfollowers list',
  SAVE_TO_WHITE_LIST = '[INSTAGRAM] save to white list',
  REMOVE_FROM_WHITE_LIST = '[INSTAGRAM] remove from white list'
}

export class LoginAction implements Action {
  readonly type = InstagramActionTypes.LOGIN;

  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = InstagramActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { userSession: string }) {}
}

export class FetchFollowersSuccess implements Action {
  readonly type = InstagramActionTypes.FETCH_FOLLOWERS_SUCCESS;

  constructor(public payload: { newFollowers: any[] }) {}
}

export class FetchFollowingsSuccess implements Action {
  readonly type = InstagramActionTypes.FETCH_FOLLOWINGS_SUCCESS;

  constructor(public payload: { newFollowings: any[] }) {}
}

export class Unfollow implements Action {
  readonly type = InstagramActionTypes.UNFOLLOW;

  constructor(public payload: { userSession: string; ids: number[] }) {}
}

export class UpdateUnfollowers implements Action {
  readonly type = InstagramActionTypes.UPDATE_UNFOLLOWERS;

  constructor(public payload: { ids: any[] }) {}
}

export class UpdateUnfollowersList implements Action {
  readonly type = InstagramActionTypes.UPDATE_UNFOLLOWERS_LIST;

  constructor(public payload: { ids: any[]; remove: boolean }) {}
}

export class SaveToWhiteList implements Action {
  readonly type = InstagramActionTypes.SAVE_TO_WHITE_LIST;

  constructor(public payload: { users: any[] }) {}
}

export class RemoveFromWhiteList implements Action {
  readonly type = InstagramActionTypes.REMOVE_FROM_WHITE_LIST;

  constructor(public payload: { users: any[] }) {}
}

export type InstagramActions =
  | LoginAction
  | LoginSuccessAction
  | FetchFollowersSuccess
  | FetchFollowingsSuccess
  | Unfollow
  | UpdateUnfollowers
  | SaveToWhiteList
  | RemoveFromWhiteList
  | UpdateUnfollowersList;
