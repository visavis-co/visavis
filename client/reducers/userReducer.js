import * as types from '../constants/actionTypes';

const initialState = {
  loginError: '',
  isLoggedIn: false,
  email: '',
  password: '',
  userInfo: {},
  currentMatch: {},
  pastMatches: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        userInfo: action.payload,
        isLoggedIn: true,
      }
      case types.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload,
      }
      case types.ENTER_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
      case types.ENTER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
      default:
      return state;
  }
}

export default userReducer;