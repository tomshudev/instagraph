import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, pluck, switchMap, tap } from 'rxjs/operators';
import {
  InstagramActionTypes,
  LoginAction,
  LoginSuccessAction,
  RemoveFromWhiteList,
  SaveToWhiteList,
  Unfollow,
  UpdateFollowings,
  UpdateUnfollowersList
} from '../actions/insagram.actions';
import { InstagramService } from '../services/instragram.service';

const WHITE_LIST = 'whiteList';

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
          pluck('data', 'login', 'userSession'),
          tap((userSession: string) => {
            if (localStorage) {
              localStorage.removeItem('session');
              localStorage.setItem('session', userSession);
            }

            this.instagramService
              .fetchFollows('followings', localStorage.getItem('session'))
              .subscribe();
            this.instagramService
              .fetchFollows('followers', localStorage.getItem('session'))
              .subscribe();
          }),
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
        .pipe(map((ids: number[]) => new UpdateFollowings({ ids })))
    )
  );

  @Effect()
  saveNewWhiteList$: Observable<Action> = this.actions$.pipe(
    ofType(InstagramActionTypes.SAVE_TO_WHITE_LIST),
    map((action: SaveToWhiteList) => {
      let whiteList = JSON.parse(localStorage.getItem(WHITE_LIST));
      whiteList = whiteList ? whiteList : { whiteList: [] };

      whiteList.whiteList.push(...action.payload.users);

      localStorage.setItem(WHITE_LIST, JSON.stringify(whiteList));

      return new UpdateUnfollowersList({
        users: whiteList.whiteList,
        remove: true
      });
    })
  );

  @Effect()
  removeFromWhiteList$: Observable<Action> = this.actions$.pipe(
    ofType(InstagramActionTypes.REMOVE_FROM_WHITE_LIST),
    map((action: RemoveFromWhiteList) => {
      let whiteList: any = JSON.parse(localStorage.getItem(WHITE_LIST));

      if (whiteList) {
        whiteList.whiteList = [
          ...whiteList.whiteList.filter(
            wl => !action.payload.users.find(u => u.pk === wl.pk)
          )
        ];
      }

      localStorage.setItem(WHITE_LIST, JSON.stringify(whiteList));

      return new UpdateUnfollowersList({
        users: action.payload.users,
        remove: false
      });
    })
  );
}
