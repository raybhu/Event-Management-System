/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  init: async function (req, res) {
    var eventModels = await Event.find();
    var user;
    if (typeof req.session.username !== "undefined") {
      user = await User.findOne({ username: req.session.username });
    }
    if (req.method == "GET") {
      return res.view('pages/Admin', {
        isUpdate: false,
        events: eventModels,
        layout: 'layouts/bootstrap',
        user: typeof user === "undefined" ? null : user,
      });
    }
  },
  update: async function (req, res) {
    var ExistedEvent = await Event.findOne(req.params.id);
    if (typeof ExistedEvent === "undefined") return res.badRequest("The Event is not existed.");
    var venueModels = await Venue.find();
    var organizerModels = await Organizer.find();
    var venueCount = await Venue.count();
    var organizerCount = await Organizer.count();
    var isSuccessfulUpdatedEvent = null;
    var log = { title: "", content: "" };
    var eventModel = await Event.findOne(req.params.id);
    var user;
    if (typeof req.session.username !== "undefined") {
      user = await User.findOne({ username: req.session.username });
    }
    if (req.method == "GET") {
      return res.view('pages/Admin/', {
        isUpdate: true,
        eventModel: eventModel,
        venues: venueModels,
        venuesCount: venueCount,
        organizers: organizerModels,
        organizersCount: organizerCount,
        layout: 'layouts/bootstrap',
        user: typeof user === "undefined" ? null : user,
      });
    } else if (req.method == "POST") {
      if (typeof req.body.Event === "undefined") {
        isSuccessfulUpdatedEvent = false;
        log = { title: "Error!", content: "Sorry, you failure updated an event. Failure reasons: The Event model is undefined!" };
      } else if (typeof req.body.Event.organizer === "undefined") {
        isSuccessfulUpdatedEvent = false;
        log = { title: "Error!", content: "Sorry, you failure updated an event. Failure reasons: The Event Organizer must be selected!" };
      } else if (typeof req.body.Event.venue === "undefined") {
        isSuccessfulUpdatedEvent = false;
        log = { title: "Error!", content: "Sorry, you failure updated an event. Failure reasons: The Venue must be selected!" };
      } else {
        await Event.update(req.params.id).set({
          eventName: req.body.Event.eventName,
          shortDescription: req.body.Event.shortDescription,
          fullDescription: req.body.Event.fullDescription,
          imageUrl: req.body.Event.imageUrl,
          organizer: req.body.Event.organizer,
          eventDate: req.body.Event.eventDate,
          time: req.body.Event.time,
          venue: req.body.Event.venue,
          quota: req.body.Event.quota,
          highlightedEvent: typeof req.body.Event.highlightedEvent === "undefined" ? false : true,
        }).fetch();
        isSuccessfulUpdatedEvent = true;
        log = { title: "Well done!", content: "Aww yeah, you successfully updated an event!" };
      }
      var viewPath = "";
      if (isSuccessfulUpdatedEvent) {
        viewPath = 'pages/Admin';
      } else {
        viewPath = 'pages/update/' + req.params.id;
      }
      var eventModels = await Event.find();
      return res.view(viewPath, {
        isSuccessfulUpdatedEvent: isSuccessfulUpdatedEvent,
        log: log,
        isUpdate: false,
        events: eventModels,
        layout: 'layouts/bootstrap',
        user: typeof user === "undefined" ? null : user,
      });
    }
  },
  delete: async function (req, res) {
    if (req.method == "GET") {
      return res.forbidden();
    } else if (req.method == "POST") {
      var models = await Event.destroy(req.params.id).fetch();
      var eventModels = await Event.find();
      var user;
      if (typeof req.session.username !== "undefined") {
        user = await User.findOne({ username: req.session.username });
      }
      return res.view('pages/Admin', {
        isSuccessfulDeletedEvent: true,
        log: { title: "Well done!", content: "Aww yeah, you successfully Deleted an event!" },
        isUpdate: false,
        events: eventModels,
        layout: 'layouts/bootstrap',
        user: typeof user === "undefined" ? null : user,
      });
    }
  },
  search: async function (req, res) {
    var event = await Event.findOne({ id: req.body.eventId });
    var userModels = await Event.find({ id: event.id }).populate('beRegister');
    res.status(200);
    return res.json({ registers: userModels[0].beRegister });
  },
};