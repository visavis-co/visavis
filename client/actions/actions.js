import Axios from "axios";
import * as types from '../constants/actionTypes';

// success
export const logIn = (user) => ({
  type: types.LOG_IN,
  payload: user,
})

// failure
export const loginFailed = (err) => ({
  type: LOGIN_FAILED,
  payload: err,
})

export const userLogin = (email, password) => dispatch => {
  return Axios.post('/login', {email: email, password: password})
    .then(user => dispatch(logIn(user)))
    .catch(err => dispatch(loginFailed(err)))
}

export const enterEmail = (value) => ({
  type: types.ENTER_EMAIL,
  payload: value,
});

export const enterPassword = (value) => ({
  type: types.ENTER_PASSWORD,
  payload: value,
});