import { combineReducers } from 'redux';
import { RECEIVE_STUFF } from './../actions/actions';

const initialState = {
  stuff: []
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case RECEIVE_STUFF: {
      return {
        ...state,
        stuff: action.payload
      }
    }

    default:
      return state;
  }
}

const myReducers = combineReducers( {
  app : appReducer });

export default myReducers;