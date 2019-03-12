import Axios from "axios";
import * as types from '../constants/actionTypes';

// success
export const logIn = (userInfo) => ({
  type: types.LOGIN,
  payload: userInfo.data,
})

// failure
export const loginFailed = (err) => ({
  type: types.LOGIN_FAILED,
  payload: err,
})

export const signupFailed = (err) => ({
  type: types.SIGNUP_FAILED,
  payload: err,
})

export const receiveChats = (chats) => ({
  type: types.RECEIVE_CHATS,
  payload: chats,
})

export const userLogin = (email, password) => dispatch => {
  return Axios.post('/login', {email: email, password: password})
    .then(userInfo => dispatch(logIn(userInfo)))
    .catch(err => dispatch(loginFailed(err)))
}
export const userSignup = (fullName, email, password) => dispatch => {
  return Axios.post('/api/user', {fullName: fullName, email: email, password: password})
    .then(userInfo => {
      console.log('Created User (POST: /api/user): ', userInfo);
      dispatch(logIn(userInfo));
    })
    .catch(err => dispatch(signupFailed(err)))
}
export const inSession = () => dispatch => {
  return Axios.get('/api/user')
    .then(userInfo => dispatch(logIn(userInfo)))
    .catch(err => dispatch(signupFailed(err)))
}

export const enterEmail = (value) => ({
  type: types.ENTER_EMAIL,
  payload: value,
});
export const enterFullName = (value) => ({
  type: types.ENTER_FULLNAME,
  payload: value,
});
export const enterPassword = (value) => ({
  type: types.ENTER_PASSWORD,
  payload: value,
});

export const logOut = () => ({
  type: types.LOGOUT,
})

export const userLogout = (userid) => dispatch => {
  return Axios.post('/logout', {id: userid})
  .then(() => dispatch(logOut()))
}

export const getChats = (matchId) => dispatch => {
  return Axios.get('/api/chat/' + matchId)
    .then(chats => dispatch(receiveChats(chats)))
}