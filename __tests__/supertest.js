const request = require('supertest');
const server = 'http://localhost:3000';
const authenticatedUser = request.agent(server);

describe('Route Integration', () => {
  describe('GET /', () => {
    it('GET to / should respond with status code 200 and content-type text/html', (done) =>{
      return request(server)
        .get('/')
        .expect('Content-type', /text\/html/)
        .expect(200, done)
    })
  })
  // describe('POST', () => {
  //   // make authenticated user 

  //   describe('/login', () => {
  //     it('should receive a status code of 200 with login', function(done) {
  //       request(server)
  //         .get('/match')
  //         .auth('username', 'password')
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /text\/html/)
  //         .expect(418, done)
  //     });
  //     // it('should not login user with incorrect credentials', function(done) {
  //     //   request(server)
  //     //     .post('/login')
  //     //     .expect(418, done)
  //     // })
  //   })

  // })
})
