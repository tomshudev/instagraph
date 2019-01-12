import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ApolloQueryResult } from "apollo-client";
import { Observable } from "rxjs";
import { pluck, tap, map } from "rxjs/operators";
import { User } from "../models/user.model";

export type FollowersResult = {
  endCursor: string;
  hasNextPage: boolean;
  data: User[];
};

@Injectable()
export class InstagramService {
  constructor(private apollo: Apollo) {}

  getFollows(
    type: string,
    userSession: string,
    after: string
  ): Observable<FollowersResult> {
    if (userSession) {
      return this.apollo
        .watchQuery({
          variables: {
            type: type,
            userSession: userSession,
            after: after
          },
          query: gql`
            query GetFollows($type: String!, $userSession: String!, $after: String) {
              getFollows(type: $type, userSession: $userSession, after: $after)
            }
          `
        })
        .valueChanges.pipe(pluck("data", "getFollows"));
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
        pluck("data", "unfollow", "ids"),
        map((d: string) => JSON.parse(d)),
        tap(data => {
          console.log(data);
        })
      );
  }
}
