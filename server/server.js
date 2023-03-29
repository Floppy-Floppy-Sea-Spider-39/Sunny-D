const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

let URL;
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'){
  URL = 'mongodb://127.0.0.1:27017'
} else {
  URL = 'mongodb+srv://sunnyDTeam:test1234@sunnyd.gewq7u7.mongodb.net/?retryWrites=true&w=majority'
}
console.log('URL', URL);
// Data Base
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// App Router
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const api = express.Router();
app.use('/api', api);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
});
}
else {
  app.get('/home', (req, res) => res.redirect('/'));
}

api.get('/submit/:username', userController.getUser, (req, res)=>{
  return res.status(200).json(res.locals.data);
})

// Record Button Click Route
// Date, Points, Username
api.post('/submit', userController.updateUser, (req, res) => {
  return res.status(200).json(res.locals.totalPoints);
});

api.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

api.post('/verify', userController.logIn, userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});
// Unknown route handler
app.use((req, res) => res.sendStatus(404));


// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
