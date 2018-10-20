/**
 * CreateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    init: async function (req, res) {

        if (req.method == "GET") {
            var venueModels = await Venue.find();
            var organizerModels = await Organizer.find();
            var venueCount = await Venue.count();
            var organizerCount = await Organizer.count();
            return res.view('pages/Create', {
                venues: venueModels, 
                venuesCount: venueCount,
                organizers: organizerModels,
                organizersCount: organizerCount,
                layout: 'layouts/bootstrap'});
        }
            
    },

};

