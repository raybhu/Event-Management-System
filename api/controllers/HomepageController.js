/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  index: async function (req, res) {
    var eventModels = await Event.find({
      where: {
        highlightedEvent: true
      },
      limit: req.wantsJSON ? null : 4,
    }).sort('createdAt DESC');
    var user;
    if (typeof req.session.username !== 'undefined') {
      user = await User.findOne({
        username: req.session.username
      });
    }
    if (req.wantsJSON) {
      return res.json(eventModels);
    }
    if (typeof eventModels !== 'undefined' && eventModels) {
      return res.view('pages/homepage', {
        events: eventModels,
        layout: 'layouts/bootstrap',
        user: typeof user === 'undefined' ? null : user,
      });
    } else {
      return res.badRequest('There is no event model in Database.');
    }
  },
};
