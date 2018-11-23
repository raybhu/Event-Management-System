module.exports = async function (req, res, proceed) {
  var user;
  if (req.wantsJSON && req.body.session) {
    user = await User.findOne({
      username: req.body.session.username
    });
    if (typeof user !== 'undefined' && user.role === 'student') {
      return proceed();
    }
  }
  if (typeof req.session.username !== 'undefined' && req.session.username) {
    user = await User.findOne({
      username: req.session.username
    });
  }
  if (typeof user !== 'undefined' && user.role === 'student') {
    return proceed(); //proceed to the next policy,
  }
  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.forbidden();
};
