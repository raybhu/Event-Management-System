/**
 * MyRegisteredEventsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    init: async function (req, res) {
        var user;
        if (typeof req.session.username !== "undefined") {
            user = await User.findOne({ username: req.session.username });
        }
        var registeredModels = await User.find({ id: user.id }).populate('registered');

        return res.view('pages/MyRegisteredEvents', {
            layout: 'layouts/bootstrap',
            user: typeof user === "undefined" ? null : user,
            events: registeredModels[0].registered,
        });
    }
};