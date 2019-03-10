import * as types from '../constants/actionTypes';

const initialState = {
  loginError: '',
  signupError: '',
  isLoggedIn: false,
  email: '',
  fullName: '',
  password: '',
  userInfo: {},
  currentMatch: {},
  pastMatches: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:{
        // console.log(action.payload.data);
      return {
        ...state,
        userInfo: action.payload,
        isLoggedIn: true,
      }}
      case types.LOGIN_FAILED: {
      return {
        ...state,
        loginError: action.payload,
      }
      }
      case types.SIGNUP_FAILED:
      return {
        ...state,
        signupError: action.payload,
      }
      case types.ENTER_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
      case types.ENTER_FULLNAME:
      return {
        ...state,
        fullName: action.payload,
      }
      case types.ENTER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
      case types.LOGOUT: 
      return {
        ...state,
        isLoggedIn: false,
      }
      default:
      return state;
  }
}

export default userReducer;