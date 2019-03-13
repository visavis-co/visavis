import * as types from '../actions/actionTypes';

const initialState = {
  loginError: '',
  signupError: '',
  isLoggedIn: false,
  email: '',
  fullName: '',
  password: '',
  userInfo: {},
  currentMatch: {},
  pastMatches: [],
  matchChats: [],
  matchToView: {},
  showMatchModal: false,
  matchLocation: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    // logging in a user
    case types.LOGIN:{
      return {
        ...state,
        userInfo: action.payload.user,
        currentMatch: action.payload.currentMatch,
        pastMatches: action.payload.pastMatches,
        isLoggedIn: true,
        email: '',
        password: '',
      }
    }

    // completed a match
    case types.COMPLETED_MATCH:{
      const pastMatches = state.pastMatches.slice();

      // need to push updated current match onto pastMatches
      const curr = state.currentMatch;
      curr.inperson = action.payload.inPerson;
      curr.location = action.payload.location;
      curr.dateCompleted = new Date();
      pastMatches.push(curr);

      return {
        ...state,
        pastMatches,
        matchLocation: '',
        currentMatch: {},
        matchToView: {},
        showMatchModal: false,
      }
    }

    // toggle show match detail modal
    case types.TOGGLE_MATCH_MODAL:
    return {
      ...state,
      showMatchModal: !state.showMatchModal,
    }
    // setting the match to view in match details
    case types.SET_MATCH_TO_VIEW:
      return {
        ...state,
        matchToView: action.payload,
      }

    // receiving a match's chat messages
    case types.RECEIVE_CHATS:
      return {
        ...state,
        matchChats: action.payload.data,
      }

    // input forms onchange updates -
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
    case types.UPDATE_MATCH_LOCATION:
      return {
        ...state,
        matchLocation: action.payload,
      }

    // error handling
    case types.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload,
      }
    case types.SIGNUP_FAILED:
      return {
        ...state,
        signupError: action.payload,
      }

    // logout a user
    case types.LOGOUT:
      return initialState;

    // initial state
    default:
      return state;
  }
}

export default userReducer;