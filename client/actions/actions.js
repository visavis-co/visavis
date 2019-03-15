import Axios from "axios";
import * as types from './actionTypes';

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
	console.log('TCL: email, password', email, password)

  return Axios.post('/login', {email: email, password: password})
    .then(res => {
      dispatch(logIn(res));
    })
    .catch(err => {
      dispatch(loginFailed(err.response.data.msg));
    })
}

export const userSignup = (fullName, email, password) => dispatch => {
  return Axios.post('/api/user', {fullName: fullName, email: email, password: password})
    .then(userInfo => {
      console.log('Created User (POST: /api/user): ', userInfo);
      dispatch(logIn(userInfo));
    })
    .catch(err => dispatch(signupFailed(err.response.data.msg)))
}

export const checkLogin = () => dispatch => {
  return Axios.get('/api/user')
    .then(userInfo => { if (userInfo) return dispatch(logIn(userInfo))})
}

export const setMatchToView = (value) => ({
  type: types.SET_MATCH_TO_VIEW,
  payload: value,
});

export const toggleMatchModal = () => ({
  type: types.TOGGLE_MATCH_MODAL,
});

export const toggleMatchOnline = () => ({
  type: types.TOGGLE_MATCH_ONLINE,
});

export const userLogout = (userid) => dispatch => {
  return Axios.post('/logout', {id: userid})
  .then(() => dispatch({ type: types.LOGOUT }))
}

export const getChats = (matchId) => dispatch => {
  return Axios.get('/api/chat/' + matchId)
    .then(chats => dispatch(receiveChats(chats)))
}

export const addChatMsg = (userId, matchId, message) => ({
  type: types.ADD_CHAT_MESSAGE,
  payload: {userId, matchId, message},
})

export const sendChatMsg = (userId, matchId, message) => dispatch => {
	console.log('TCL: userId, matchId, message', userId, matchId, message)
  return Axios.post('/api/chat/', {userId, matchId, message})
    .then(() => {
      dispatch(updateChatMsg(''));
      dispatch(getChats(matchId));
    })
}

export const completeMatch = (matchId, location, inPerson) => dispatch => {
  return Axios.post('/api/match', {matchId, location, inPerson})
    .then(() => dispatch(completedMatch({matchId, location, inPerson})))
}
export const completedMatch = (match) => ({
  type: types.COMPLETED_MATCH,
  payload: match,
});

// form input onchange update action creators
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

export const updateMatchLocation = (value) => ({
  type: types.UPDATE_MATCH_LOCATION,
  payload: value,
})
export const updateChatMsg = (value) => ({
  type: types.UPDATE_CHAT_MSG,
  payload: value,
})

//Change user settings

export const changeNameInDb = (userInfo, fullName) => dispatch => {
  console.log('1, firing action from actions.js')
  console.log(userInfo, fullName)
  return Axios.put('/api/changename', { id: userInfo.id, fullName: fullName })
  .then( (res) => {
    setTimeout(() => dispatch(toggleServerResponse), 3000);
    dispatch(toggleServerResponse)
    setTimeout(() => dispatch(toggleSuccessMessage), 2000);
    dispatch(toggleSuccessMessage);
})
  .catch(() => {
    console.log('actions.js no 200')
    setTimeout(() => dispatch(toggleSuccessMessage), 2000);
    dispatch(toggleSuccessMessage);
})
}

export const changeNameInState = newName => ({
  type: types.CHANGE_NAME,
  payload: newName
})

export const handleSelectedFile = (file) =>  ({  
  type: types.HANDLE_SELECTED_FILE,
  payload: file,
})

export const handleUpload = (userInfo) => dispatch => {
  // console.log('userInfo from handle upload', userInfo)
  console.log('picObj from handle upload', userInfo.picObj)
  let data = new FormData();
  // data.append('file', userInfo.picObj, userInfo.picObj.name);
  data.append('profilePic', userInfo.picObj);
  data.append('id', userInfo.id)
  data.append('email', userInfo.email);
  
  fetch('http://localhost:3000/addphoto', {
    method: 'POST',
    body: data,
  })
  .then(res => console.log('fetchres', res))
  .catch(err => console.log('fetcherr', err))

  // return Axios.post('/addphoto')
  //   .then(res => console.log('res', res))

}

export const changeEmailInDb = (userInfo, email) => dispatch => {
  const id = userInfo.id
  console.log('changeEmailinDB --- what is userInfo ->', userInfo)
  return Axios.put('/api/changeemail', {id: id, email: email})
  .then( (res) => {
    setTimeout(() => dispatch(toggleServerResponse), 3000);
    dispatch(toggleServerResponse)
    setTimeout(() => dispatch(toggleSuccessMessage), 2000);
    dispatch(toggleSuccessMessage);
})
  .catch(() => {
    console.log('actions.js no 200')
    setTimeout(() => dispatch(toggleSuccessMessage), 2000);
    dispatch(toggleSuccessMessage);
})
}

export const changePasswordInDb = (userInfo, password, passwordOld) => dispatch => {
  const id = userInfo.id;
  return Axios.put('/api/changepassword', {id, password, passwordOld} )
  .then( (res) => {
      setTimeout(() => dispatch(toggleServerResponse), 3000);
      dispatch(toggleServerResponse)
      setTimeout(() => dispatch(toggleSuccessMessage), 2000);
      dispatch(toggleSuccessMessage);
})
  .catch(() => {
      console.log('actions.js no 200')
      setTimeout(() => dispatch(toggleSuccessMessage), 2000);
      dispatch(toggleSuccessMessage);
})
}

export const enterPasswordOld = (passwordOld) => ({
  type: 'ENTER_PASSWORD_OLD',
  payload: passwordOld
})

export const toggleSuccessMessage = ({
  type: 'TOGGLE_SUCCESS_MESSAGE'
})

export const toggleServerResponse = ({
  type: 'TOGGLE_SERVER_RESPONSE'
})

