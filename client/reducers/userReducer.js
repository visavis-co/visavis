import * as types from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  // currentPage: 'loginPage',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case types.IS_LOGGED_IN:
        return {
          ...state,
          isLoggedIn: true,
          // currentPage: 'matchPage'
        }

    default:
      return state;
  }
}

export default userReducer;