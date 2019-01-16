import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, Observer } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import {
  FetchFollowersSuccess,
  FetchFollowingsSuccess
} from '../actions/insagram.actions';
import { User } from '../models/user.model';
import { InstagramState } from '../reducers/instagram.reducer';

export type FollowersResult = {
  endCursor: string;
  hasNextPage: boolean;
  data: User[];
};

@Injectable()
export class InstagramService {
  constructor(private apollo: Apollo, private store: Store<InstagramState>) {}

  getFollows(
    type: string,
    userSession: string,
    after: string
  ): Observable<any> {
    if (userSession) {
      return this.apollo
        .watchQuery({
          variables: {
            type: type,
            userSession: userSession,
            after: after
          },
          query: gql`
            query GetFollows(
              $type: String!
              $userSession: String!
              $after: String
            ) {
              getFollows(type: $type, userSession: $userSession, after: $after)
            }
          `
        })
        .valueChanges.pipe(pluck('data', 'getFollows'));
    }
  }

  unfollow(userSession: string, ids: number[]) {
    return this.apollo
      .watchQuery({
        variables: {
          ids: ids,
          userSession: userSession
        },
        query: gql`
          query Unfollow($userSession: String!, $ids: [Float]!) {
            unfollow(userSession: $userSession, ids: $ids)
          }
        `
      })
      .valueChanges.pipe(
        pluck('data', 'unfollow', 'ids'),
        map((d: string) => JSON.parse(d)),
        tap(data => {
          console.log(data);
        })
      );
  }

  fetchFollows(type: string, session: string) {
    return Observable.create((observer: Observer<any[]>) => {
      const fetchData = (type: string, userId: string, after: string) => {
        return this.getFollows(type, userId, after);
      };

      const emitNext = (cursor: string) => {
        let obs = fetchData(type, session, cursor).pipe(
          map(data => {
            return { ...data, [type]: JSON.parse(data[type]) };
          })
        );
        obs.subscribe(data => {
          this.store.dispatch(
            type === 'followers'
              ? new FetchFollowersSuccess({ newFollowers: data['followers'] })
              : new FetchFollowingsSuccess({
                  newFollowings: data['followings']
                })
          );
        });
      };

      emitNext('empty');
    });
  }
}
