const request = require('supertest');
const server = 'http://localhost:3000';
const { default: mongoose } = require('mongoose');
const userController = require('../server/controllers/userController');
const User = require('../server/userModel')

describe('Route integration', () => {
    //testing static files
    describe('Static file testing', () => {
      describe('GET', () => {
        // Note that we return the evaluation of `request` here! It evaluates to
        // a promise, so Jest knows not to say this test passes until that
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('responds with 200 status and text/html content type', () => request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200));
        it('response with a 404 status', () => request(server)
            .get('/notreal')
            .expect(404))
      });
    });


    describe('API paths', () => {
        beforeAll(async () => {
            connection = await mongoose.connect('mongodb://127.0.0.1:27017' );
            });
        
          afterAll(async () => {
            await User.deleteMany({})
            await mongoose.connection.close();
          });

        //test route paths to /api/signup

        describe('/signup',  () => {
            it('responds with a 200 status', () => request(server)
              .post('/api/signup')
              .send({username:'testusername', password: 'testpassword'})
              .expect(200)
              .then(response => {
                expect(response._body.username).toEqual('testusername');
                expect(response._body.password).not.toEqual('testpassword');
                // expect(response.zipcodeEntry).toEqual(12345)
              })
            //   .then(async ()=>{
            //     const db = await User.find({})
            //     console.log('whole database: ', db)
            //   }
            //   )
            
            
            )
            it('should have a new user in the database', async () => {
                const db = await User.find({}).exec();
                const user = await User.findOne({username:'testusername'}).exec();
                expect(user.username).toEqual('testusername');
                expect(user.password).not.toEqual('testpassword');
                // expect(user.zipcodeEntry).toEqual(12345);

            })
        })

        //test route paths to /api/verify

        describe('/verify', () => {
          it('adds new user to DB', () => request(server) 
            .post('/api/signup')
            .send({username: 'testuser', password: 'testpassword'})
          )
          
          it('responds with a 200 status', () => request(server)
            .post('/api/verify')
            .send({username:'testuser', password: 'testpassword'})
            .expect(200)
            )
          
          it('should have a matching username in the database', async () => {
            const db = await User.find({}).exec();
            const user = await User.findOne({username: 'testuser'}).exec();
            // .post('/api/verify')
            expect(user.username).toEqual('testuser');
            expect(user.password).not.toEqual('testpassword');
            
          })

        })


        // //testing route paths to /api/submit

        describe('/submit', () => {
          const user = User.create({username: 'testname', password: 'password'})

            // it('creates new user', async() => {
            // })
            
            it('responds with the total points', () => request(server)
              .post('/api/submit')
              .send({username: 'testname', date: 'March 23 2023', points: 10})
              .expect(200)
              .then(response => {
                // console.log('here is response ---> ', response)
                // expect(response._body.username).toEqual('testname')
                // expect(response._body.date).toEqual('testdate')
                expect(response._body).toEqual(10)
                
              })
            )
            })
          

          describe('/addday', () => {
            const addDayUser = User.create({username: 'addDayUser', password: 'addDayPassword'})

            it ('should not have any days before middleware runs', async () => {
              const user = await User.findOne({username: 'addDayUser'}).exec()
              console.log(user)
              expect(!user.days.length)
            })
            it ('should add the current date and 0 points to the days array', () => request(server)
              .post(`/api/addday/addDayUser`)
              .send({date: new Date().toDateString()})
              .then(async () => {
                const user = await User.findOne({username: 'addDayUser'}).exec()
                console.log('addDayUser after adding day', user)
                expect(user.days.length).toEqual(1)
                expect(user.days[0].date).toEqual(new Date().toDateString())
                expect(user.days[0].points).toEqual(0)
              })
            )
        })
    })
})