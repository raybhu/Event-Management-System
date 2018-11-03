/**
 * DetailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    init: async function (req, res) {

        if (req.method == "POST") {
            return res.forbidden();
        }
        var eventModel = await Event.findOne(req.params.id);
        return res.view('pages/Detail', {
            eventModel: eventModel,
            layout: 'layouts/bootstrap'
        });

    },
};

