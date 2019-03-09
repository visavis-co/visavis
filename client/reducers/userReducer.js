import * as types from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: {},
  currentMatch: {},
  pastMatches: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case types.IS_LOGGED_IN:
        return {
          ...state,
          isLoggedIn: true,
          // how to tell the router where to move to ?
        }

    default:
      return state;
  }
}

export default userReducer;