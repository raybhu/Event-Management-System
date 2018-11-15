/**
 * CreateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  init: async function (req, res) {
    var venueModels = await Venue.find();
    var organizerModels = await Organizer.find();
    var venueCount = await Venue.count();
    var organizerCount = await Organizer.count();
    var isSuccessfulCreatedEvent = null;
    var log = {
      title: '',
      content: ''
    };
    var user;
    if (typeof req.session.username !== 'undefined') {
      user = await User.findOne({
        username: req.session.username
      });
    }
    if (req.method === 'GET') {
      return res.view('pages/Create', {
        venues: venueModels,
        venuesCount: venueCount,
        organizers: organizerModels,
        organizersCount: organizerCount,
        layout: 'layouts/bootstrap',
        user: typeof user === 'undefined' ? null : user,
        isNeedTimePicker: true,
      });
    } else if (req.method === 'POST') {
      if (typeof req.body.Event === 'undefined') {
        isSuccessfulCreatedEvent = false;
        log = {
          title: 'Error!',
          content: 'Sorry, you failure created event. Failure reasons: The Event model is undefined!'
        };
      } else if (typeof req.body.Event.organizer === 'undefined') {
        isSuccessfulCreatedEvent = false;
        log = {
          title: 'Error!',
          content: 'Sorry, you failure created event. Failure reasons: The Event Organizer must be selected!'
        };
      } else if (typeof req.body.Event.venue === 'undefined') {
        isSuccessfulCreatedEvent = false;
        log = {
          title: 'Error!',
          content: 'Sorry, you failure created event. Failure reasons: The Venue must be selected!'
        };
      } else {
        // var d = new Date(req.body.Event.eventDate);
        // console.log(req.body.Event.eventDate);
        // console.log(d);
        // req.body.Event.eventDate = d;
        await Event.create(req.body.Event);
        isSuccessfulCreatedEvent = true;
        log = {
          title: 'Well done!',
          content: 'Aww yeah, you successfully created a new event!'
        };
      }
      return res.view('pages/Create', {
        isSuccessfulCreatedEvent: isSuccessfulCreatedEvent,
        log: log,
        venues: venueModels,
        venuesCount: venueCount,
        organizers: organizerModels,
        organizersCount: organizerCount,
        layout: 'layouts/bootstrap',
        user: typeof user === 'undefined' ? null : user,
        isNeedTimePicker: true,
      });
    }
  },
};
