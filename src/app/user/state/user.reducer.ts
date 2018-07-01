import { User } from "../user";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAction, UserActionType } from "./user.action";

export interface UserState {
  maskUserName: boolean,
  currentUser: User
};

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getmaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
)

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
)

export function reducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionType.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      }
  
    default:
      return state;
  }
}