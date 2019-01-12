import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { Action } from "@ngrx/store";
import {
  InstagramActionTypes,
  LoginAction,
  LoginSuccessAction,
  Unfollow,
  UnfollowSuccess
} from "../actions/insagram.actions";
import {
  catchError,
  map,
  mergeMap,
  tap,
  switchMap,
  pluck
} from "rxjs/operators";
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { InstagramService } from "../services/instragram.service";

@Injectable()
export class InstagramEffects {
  client: any;

  constructor(
    private actions$: Actions,
    private apollo: Apollo,
    private instagramService: InstagramService
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(InstagramActionTypes.LOGIN),
    switchMap((action: LoginAction) =>
      this.apollo
        .watchQuery({
          variables: {
            username: action.payload.username,
            password: action.payload.password
          },
          query: gql`
            query Login($username: String!, $password: String!) {
              login(user: { username: $username, password: $password })
            }
          `
        })
        .valueChanges.pipe(
          pluck("data", "login", "userSession"),
          map((userSession: string) => new LoginSuccessAction({ userSession }))
        )
    )
  );

  @Effect()
  unfollow$: Observable<Action> = this.actions$.pipe(
    ofType(InstagramActionTypes.UNFOLLOW),
    switchMap((action: Unfollow) =>
      this.instagramService
        .unfollow(action.payload.userSession, action.payload.ids)
        .pipe(map((ids: number[]) => new UnfollowSuccess({ ids })))
    )
  );
}
