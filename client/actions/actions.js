import Axios from "axios";
import * as types from '../constants/actionTypes';

export const logIn = () => ({
  type: types.IS_LOGGED_IN,
})

// export const receiveStuff = (stuff) => ({
//   type: RECEIVE_STUFF,
//   payload: stuff
// })

// export const fetchStuff = () => dispatch => {
//   return Axios.get('/api/stuff')
//     .then(stuff => dispatch(receiveStuff(stuff)))
//     .catch(err => { console.log(err) })
// }