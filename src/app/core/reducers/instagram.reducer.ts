import {
  InstagramActions,
  InstagramActionTypes
} from '../actions/insagram.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { initialState } from './basic.state';

export type InstagramState = {
  loggedUserSession?: string;
  followers: any[];
  followings: any[];
  followingForUnfollowers: any[];
};

// export const initialState: InstagramState = {
//   followers: [],
//   followings: []
// };

export function instagramReducer(
  state = initialState,
  action: InstagramActions
): InstagramState {
  switch (action.type) {
    case InstagramActionTypes.LOGIN_SUCCESS: {
      return { ...state, loggedUserSession: action.payload.userSession };
    }

    case InstagramActionTypes.FETCH_FOLLOWERS_SUCCESS: {
      let uniqueFollowers = uniq(action.payload.newFollowers);
      return {
        ...state,
        followers: [...uniqueFollowers]
      };
    }

    case InstagramActionTypes.FETCH_FOLLOWINGS_SUCCESS: {
      let uniqueFollowings = uniq(action.payload.newFollowings);
      return {
        ...state,
        followings: [...uniqueFollowings]
      };
    }

    case InstagramActionTypes.UPDATE_UNFOLLOWERS: {
      let newFollowings = state.followings.filter(
        f => !action.payload.ids.find(pk => pk.pk === f.pk)
      );
      return {
        ...state,
        followings: [...newFollowings]
      };
    }

    case InstagramActionTypes.UPDATE_UNFOLLOWERS_LIST: {
      let newFollowings;
      if (action.payload.remove) {
        newFollowings = state.followings.filter(
          f => !action.payload.ids.find(pk => pk.pk === f.pk)
        );
      } else {
        newFollowings = [...state.followingForUnfollowers];
        newFollowings.push(...action.payload.ids)
      }
      return {
        ...state,
        followingForUnfollowers: [...newFollowings]
      };
    }

    default:
      return state;
  }
}

export const getState = createFeatureSelector<InstagramState>('instagram');
export const getUserSession = createSelector(
  getState,
  (state: InstagramState) => state.loggedUserSession
);

export const getAllFollowers = createSelector(
  getState,
  (state: InstagramState) => state.followers
);

export const getAllFollowings = createSelector(
  getState,
  (state: InstagramState) => state.followings
);

export const getAllNonFollowers = createSelector(
  getState,
  (state: InstagramState) => {
    let whiteList = [];

    if (localStorage && localStorage.getItem('whiteList')) {
      whiteList = JSON.parse(localStorage.getItem('whiteList')).whiteList;
    }

    let a = state.followingForUnfollowers.filter(
      following =>
        !state.followers.find(f => f.username === following.username) &&
        !whiteList.find(pk => pk.pk === following.pk)
    );
    console.log(a);
    return a;
  }
);

function uniq(a) {
  var seen = {};
  let b = a.filter(function(item) {
    var k = item.pk;
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });

  return b;
}
