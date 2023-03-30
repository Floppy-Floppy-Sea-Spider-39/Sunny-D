const Cookies = require ('js-cookie');
const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {


  // setSSIDcookie creates 2 cookies: setSSID cooking and login cookie
  const { _id } = res.locals.user;


  //res.cookie creates a cookie
  // ssid cookie
  res.cookie('ssid', `${_id}`);
  res.locals.id = _id;
  
  console.log(' SetSSIDCOOKIE', res.locals.user._id);



  //loggedIn cookie
  res.cookie('loggedIn', 'true', {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: 'strict',
    path: '/',
  });
  return next();
};

cookieController.checkCookie = async (req, res, next) => {
  try {
    const cookie = Cookies.get('loggedIn');
    if (cookie) {
      return next();
    }
    else {
      console.log('there is an error in cookieController.checkCookie');
      return next();
    }
  }
  catch (err){
    return next(err);
  }
}



module.exports = cookieController;