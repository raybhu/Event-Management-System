/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    index: async function (req, res) {
        var today = new Date();
        
        var eventModels = await Event.find({
            where: {highlightedEvent: true},
            limit: 4,
        }).sort('createdAt DESC');
        console.log(eventModels);
        if (typeof eventModels !== 'undefined' && eventModels) {
            return res.view('pages/homepage', {
                events: eventModels,
                layout: 'layouts/bootstrap'});
        }
        
        return res.view('pages/homepage', {layout: 'layouts/bootstrap'});

    },
};

