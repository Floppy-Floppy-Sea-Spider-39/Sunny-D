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
    const cookie = Cookie.get('loggedIn');
    if (cookie) {
        next()
    } else {

    }
}





module.exports = cookieController;