/**
 * SearchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    init: async function (req, res) {
        if (req.method == "POST") {
            return res.forbidden();
        }
        var eventModels = null;
        var constraint = {};
        if (typeof req.query.searchEventName !== 'undefined') {
            constraint["eventName"] = { contains: req.query.searchEventName };
        }
        if (typeof req.query.searchStartDate !== 'undefined' && req.query.searchStartDate) {
            //constraint["eventDate"] = req.query.searchStartDate;
            if (typeof constraint["eventDate"] === 'undefined') {
                constraint["eventDate"] = {};
            }
            constraint["eventDate"]['>='] = req.query.searchStartDate;
        }
        if (typeof req.query.searchEndDate !== 'undefined' && req.query.searchEndDate) {
            if (typeof constraint["eventDate"] === 'undefined') {
                constraint["eventDate"] = {};
            }
            constraint["eventDate"]['<='] = req.query.searchEndDate;
        }
        if (typeof req.query.searchOrganizer !== 'undefined') {
            constraint["organizer"] = req.query.searchOrganizer;
        }
        if (typeof req.query.searchVenue !== 'undefined') {
            constraint["venue"] = req.query.searchVenue;
        }
        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;
        var amount = 0;
        if (typeof constraint !== 'undefined') {
            eventModels = await Event.find({
                where: constraint,
                sort: 'eventName',
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            amount = await Event.count({
                where: constraint,
            });
        } else {
            eventModels = await Event.find({
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            amount = await Event.count();
        }
        var venueModels = await Venue.find();
        var organizerModels = await Organizer.find();
        var venueCount = await Venue.count();
        var organizerCount = await Organizer.count();
        var numOfPage = Math.ceil(amount / numOfItemsPerPage);
        var user;
        if (typeof req.session.username !== "undefined") {
            user = await User.findOne({ username: req.session.username });
        }
        if (req.method == "GET") {
            return res.view('pages/Search', {
                events: eventModels,
                venues: venueModels,
                venuesCount: venueCount,
                organizers: organizerModels,
                organizersCount: organizerCount,
                count: numOfPage,
                layout: 'layouts/bootstrap',
                user: typeof user === "undefined" ? null : user,
            });
        }
    },
};