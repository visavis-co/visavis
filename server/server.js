require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const user = require('./controllers/usersController');
const matches = require('./controllers/matchesController');
const chat = require('./controllers/chatController');
const auth = require('./controllers/authController');
const bodyParser = require('body-parser');
const email = require('./controllers/emailController');
const schedule = require('node-schedule');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const cors = require('cors');


app.use(bodyParser.json());   // run body parser on all server requests
app.use(cookieParser());      // run cookie parser on all server requests
app.use(cors());

// schedules recurring rematches on monday at 9:30 AM
const rematch = schedule.scheduleJob({hour: 9, minute: 30, dayOfWeek: 1},()=>{
  matches.rematchAll();
})


/**
 * POST to /login - User login
 *
 * Expecting { email, password } to be in request body
 *
 * 1. Verify if a user is in the database, Set res.locals to user id
 * 2. Create a cookie / session to login the user
 * 3. Return user information with matches
 *
 */
app.post(
  '/login',
  user.verifyUser,          // verify user email/pw to login user
  user.getUser,             // gets user info matching res.locals.userId
  matches.getUserMatches,   // gets user matches matching res.locals.userId
  auth.startSession,        // sets the session token in user db
  auth.setSSIDCookie,       // sets SSID cookie on client
  (req, res) => {
    res.send(res.locals.user);
  }
);

/**
 * API - POST to /api/user - Creates a new user in the app
 *
 * Expecting { email, fullName, password } to be in request body
 *
 * 1. Create a user in the database, Set res.locals to user id that was just added
 * 2. Create a cookie / session to login the user
 * 3. Make a match for new user if there are any other users that are matchable.
 * 4. Return user information with matches
 *
 */

app.post(
  '/api/user',
  user.createUser,            // creates a user in the db
  user.getUser,               // gets user info matching res.locals.userId
  matches.matchNewUser,       // looks for a match for this newly created user
  matches.getUserMatches,     // gets user matches matching res.locals.userId
  auth.startSession,          // sets the session token in user db
  auth.setSSIDCookie,         // sets SSID cookie on client
  (req, res) => {
    res.send(res.locals.user);
  }
);

/**
 * API - GET to /api/user - Check authentication with cookie from front end
 *
 * 1. Get token information from user cookie and find user session
 * 2. Get user information and return it
 * 3. Return user information with matches
 *
 */

app.get(
  '/api/user',
  auth.checkLogin,            // Check for login from client cookie
  user.getUser,               // gets user info matching res.locals.userId
  matches.getUserMatches,     // gets user matches matching res.locals.userId
  auth.startSession,          // sets the session token in user db
  auth.setSSIDCookie,         // sets SSID cookie on client
  (req, res) => {
    res.send(res.locals.user);
  }
);

/**
 * API - POST to /logout - User logging out
 *
 * Get userId from body and delete sessionToken from users table
 * and clear cookie
 *
 */
app.post('/logout', auth.logout);

// POST to /addphoto - User adding profile photo
app.post('/addphoto', upload.single('profilePic'), user.addPhoto)

/**
 * API - POST to /api/match - Updates a match record to complete the match
 *
 * Expecting { matchId, inPerson, location } to be in request body
 *
 * 1. Updates the inPerson, location for a match
 *
 */

app.post(
  '/api/match',
  matches.completeMatch,
  (req, res) => {
    res.send('Match updated');
  }
);

/**
 * API - POST to /api/chat - Inserts a chat message into the db
 *
 * Expecting { userId, matchId, message } to be in request body
 *
 */

app.post(
  '/api/chat',
  chat.sendChatMsg,
  (req, res) => {

    // send the new chat message with userId to the client
    io.to('match-' + res.locals.matchId).emit('new msg', { message: res.locals.chatMsg, userId:res.locals.chatUserId });

    res.send('Chat inserted');
  }
);

/**
 * API - GET to /api/chat/:matchId - Gets all the chat msgs for matchId
 *
 * Expecting { matchId } to be in get request
 *
 */

app.get(
  '/api/chat/:matchId',
  chat.getChats,
  (req, res) => {
    res.send(res.locals.chats);
  }
);

app.put(
  '/api/changename',
  user.changeName,
  (req, res) => {
    console.log('3, received response from db sending res.locals to client')
    res.status(200).send('user updated')
  }
)

app.put(
  '/api/changeemail',
  user.changeEmail,
  (req, res) => {
    console.log('received response from db, exiting server.js')
    res.status(200).send('email updated in db')
  }
)

app.put(
  '/api/changepassword',
  user.changePassword,
  user.changePassword2,
  (req, res) => {
    console.log('all middleware succesfully fired, will send status back')
    console.log('here in server.js')
    res.status(200).send('password changed successfully')
  }
)


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// error handling catch all
app.use((err, req, res, next) => {
  res.status(418).send({name: err.name, msg:err.message});
})


io.on('connection', (client) => {
  console.log('a user connected');
  // connect client to current match's room
  client.on('connect to room', (match) => {
    client.join(['match-' + match.id]);
    client.to(['match-' + match.id]).emit('someone joined');
    io.to(['match-' + match.id]).clients((err, clients) => {
      io.to(['match-' + match.id]).emit('num clients', clients.length);
    })
  })

  client.on('disconnecting', ()=> {
    const room = Object.keys(client.rooms)[1];
    io.to(room).emit('someone left')
    io.to(room).clients((err, clients) => {
      io.to(room).emit('num clients', clients.length-1);
    })
  })
})
server.listen(3000); //listens on port 3000 -> http://localhost:3000/

