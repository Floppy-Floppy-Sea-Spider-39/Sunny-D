const User = require('../userModel');

const userController = {};

userController.updateUser = async (req, res, next) => {
  try {
    const { username, date, points } = req.body;
    const user = await User.findOne({ username });
    const index = user.days.length - 1;

    // console.log('before first conditional');

      if (user.days.length === 0 || user.days[index].date !== date) { 
        // console.log('in first conditional')
        const update = await User.findOneAndUpdate(
          { username },
          { $push: { days: { date: date, points: points } } },
          { new: true }
        );
        // console.log('after findOneAndUpdate');
      }
      // console.log('this is username ---->', username)
      // console.log('this is date ---->', date)
      // console.log('this is points ---->', points)
      
      // console.log('this is days ------>', user.days)

      if (user.days.length !== 0) {
        const currentDate = user.days[index];
        const newPoints = currentDate.points + points;
        // console.log('in second conditional')
        const update = await User.findOneAndUpdate(
          { username },
          { $set: { [`days.${index}.points`]: newPoints } },
          { new: true }
        );
        res.locals.totalPoints = update.days[index].points;
        return next();
      } else {
        // console.log('in second conditional else statement')
        res.locals.totalPoints = points;
        return next();
      }
    } catch (err) {
        // console.log('in catch error')
        return next({
        log: 'Error in userController.updateUser: ' + err,
        status: 418,
        message: { err: 'An error occurred in userController.updateUser' },
    });
  }
};



userController.getUser = async (req, res, next) => {
  const { username } = req.params;
  await User.findOne({ username: username })
    .then((data) => {
      if (data) {
        res.locals.user = data
        res.locals.data = data.days[data.days.length-1];
      }
      else res.locals.data = 0;
      return next();
    });
};

userController.createUser = async (req, res, next) => {
  console.log('inside createUser middleware')
  console.log('request body --->', req.body)
  const { username, password, days } = req.body;
  const newUser = await User.create({ username: username, password: password, days: days });
  console.log('this is newUser ---> ', newUser);
  res.locals.newUser = newUser;
  return next();
};


userController.logIn = async (req, res, next) => {
  const { username, password } = req.body;
  await User.findOne({ username: username })
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

userController.addDay = async(req, res, next) => {
  const { username } = req.params;
  const { date } = req.body;
  const update = await User.findOneAndUpdate(
    { username },
    { $push: { days: { date: date, points: 0 } } },
    { new: true }
  );
  console.log('ADDED NEW DAY', update)
  return next()
}


module.exports = userController;