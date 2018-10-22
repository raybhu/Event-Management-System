/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    index: async function (req, res) {

        
        var eventModels = await Event.find({
            limit: 4,
        });
        if (typeof eventModels !== 'undefined' && eventModels) {
            return res.view('pages/homepage', {
                events: eventModels,
                layout: 'layouts/bootstrap'});
        }
        
        return res.view('pages/homepage', {layout: 'layouts/bootstrap'});

    },
};

