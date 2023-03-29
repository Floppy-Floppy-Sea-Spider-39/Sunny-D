const User = require('../userModel');

const userController = {};

userController.updateUser = async (req, res, next) => {
  try {
    const { username, date, points } = req.body;
    const user = await User.findOne({ username });
    const index = user.days.length - 1;

      if (user.days.length === 0 || user.days[index].date !== date) { 
        const update = await User.findOneAndUpdate(
          { username },
          { $push: { days: { date: date, points: points } } },
          { new: true }
        );
      }
      const currentDate = user.days[index];
      const newPoints = currentDate.points + points;
      if (currentDate.date === date) {
        const update = await User.findOneAndUpdate(
          { username },
          { $set: { [`days.${index}.points`]: newPoints } },
          { new: true }
        );
        res.locals.totalPoints = update.days[index].points;
        return next();
      } else {
        res.locals.totalPoints = points;
        return next();
      }
    } catch (err) {
        return next({
        log: 'Error in userController.updateUser: ' + err,
        status: 418,
        message: { err: 'An error occurred in userController.updateUser' },
    });
  }
};


userController.getUser = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username: username })
    .then((data) => {
      if (data) res.locals.data = data.days.pop();
      else res.locals.data = 0;
      return next();
    });
};

userController.createUser = async (req, res, next) => {
  console.log('inside createUser middleware')
  console.log('request body --->', req.body)
  const { username, password } = req.body;
  const newUser = await User.create({ username: username, password: password });
  console.log('this is newUser ---> ', newUser);
  res.locals.newUser = newUser;
  return next();
};


userController.logIn = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        res.locals.status = false;
        return next(err);
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) return next(err);
          res.locals.status = isMatch;
          res.locals.user = user;
          return next();
        });
      }
    })
    .catch((err) => {
      return next(err);
    });
};




module.exports = userController;