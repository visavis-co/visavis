import * as types from '../constants/actionTypes';

const initialState = {
  stuff: []
}

const userReducer = (state = initialState, action) => {
  switch (action.types) {

    case types.IS_LOGGED_IN: {
      return {
        ...state,
        stuff: action.payload
      }
    }

    default:
      return state;
  }
}

export default userReducer;