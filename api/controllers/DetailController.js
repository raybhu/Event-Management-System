/**
 * DetailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  init: async function (req, res) {
    if (req.method === 'POST') {
      return res.forbidden();
    }
    var eventModel = await Event.findOne(req.params.id);
    var user;
    if (typeof req.session.username !== 'undefined') {
      user = await User.findOne({
        username: req.session.username
      });
    }
    var isRegistered = false;
    var userModel = await User.findOne(user.id).populate('registered');
    for (var i in userModel.registered) {
      if (userModel.registered[i].id === eventModel.id) {
        isRegistered = true;
      }
    }
    return res.view('pages/Detail', {
      eventModel: eventModel,
      layout: 'layouts/bootstrap',
      user: typeof user === 'undefined' ? null : user,
      isRegistered: isRegistered,
    });
  },
};
