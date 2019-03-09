import Axios from "axios";

export const RECEIVE_STUFF = 'RECEIVE_STUFF';

export const receiveStuff = (stuff) => ({
  type: RECEIVE_STUFF,
  payload: stuff
})

export const fetchStuff = () => dispatch => {
  return Axios.get('/api/stuff')
    .then(stuff => dispatch(receiveStuff(stuff)))
    .catch(err => { console.log(err) })
}
