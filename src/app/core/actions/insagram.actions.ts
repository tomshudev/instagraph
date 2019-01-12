import { Action } from "@ngrx/store";

export enum InstagramActionTypes {
  LOGIN = "[INSTAGRAM] login",
  LOGIN_SUCCESS = "[INSTAGRAM] login success",
  GET_ALL_FOLLOWERS = "[INSTAGRAM] get all followers",
  GET_ALL_FOLLOWINGS = "[INSTAGRAM] get all followings",
  FETCH_FOLLOWERS_SUCCESS = "[INSTAGRAM] fetch followers success",
  FETCH_FOLLOWINGS_SUCCESS = "[INSTAGRAM] fetch followings success",
  UNFOLLOW = "[INSTAGRAM] unfollow",
  UNFOLLOW_SUCCESS = "[INSTAGRAM] unfollow success"
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

  constructor(public payload: { userSession: string, ids: number[] }) {}
}

export class UnfollowSuccess implements Action {
  readonly type = InstagramActionTypes.UNFOLLOW_SUCCESS;

  constructor (public payload: { ids: number[] }) {}
}

export type InstagramActions =
  | LoginAction
  | LoginSuccessAction
  | FetchFollowersSuccess
  | FetchFollowingsSuccess
  | Unfollow
  | UnfollowSuccess;
