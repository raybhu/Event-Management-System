/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  login: async function (req, res) {
    if (req.method === 'GET') {
      return res.redirect('/');
    }
    if (!req.body.username) {
      return res.badRequest();
    }
    if (!req.body.password) {
      return res.badRequest();
    }
    var user = await User.findOne({
      username: req.body.username
    });
    if (!user) {
      res.status(401);
      return res.send('User not found');
    }
    const match = await sails.bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(401);
      return res.send('Wrong Password');
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.serverError(err);
      }
      req.session.username = req.body.username;
      if (req.wantsJSON) {
        return res.status(200).json({
          username: req.session.username
        });
      }
      sails.log('Login successfully. \n Session: ' + JSON.stringify(req.session));
      return res.redirect('/');
    });
  },
  logout: async function (req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.serverError(err);
      }
      return res.redirect('/');
    });
  },
  checkRegistrationStatus: async function (req, res) {
    if (req.wantsJSON) {
      var eventModel = await Event.findOne({
        id: req.body.eventId
      });
      var user = await User.findOne({
        username: req.body.session.username
      });
      var userModel = await User.findOne(user.id).populate('registered');
      var isRegistered = false;
      for (var i in userModel.registered) {
        if (userModel.registered[i].id === eventModel.id) {
          isRegistered = true;
          return res.json({
            isRegistered: isRegistered
          });
        }
      }
      return res.json({
        isRegistered: isRegistered
      });
    }
  },
  registerEvent: async function (req, res) {
    var event;
    var user;
    if (req.wantsJSON) {
      event = await Event.findOne({
        id: req.body.eventId
      });
      user = await User.findOne({
        username: req.body.session.username
      });
      if (req.body.isRegister && event.quota < 1) {
        return res.send('The Quota is full');
      }
      if (req.body.isRegister) {
        await User.addToCollection(user.id, 'registered').members(req.body.eventId);
        await Event.update(event.id).set({
          quota: event.quota - 1,
        }).fetch();
      } else {
        await User.removeFromCollection(user.id, 'registered').members(req.body.eventId);
        await Event.update(event.id).set({
          quota: event.quota + 1,
        }).fetch();
      }
      return res.status(200).json({});
    }
    event = await Event.findOne({
      id: req.body.eventId
    });
    user = await User.findOne({
      username: req.session.username
    });
    await User.addToCollection(user.id, 'registered').members(req.body.eventId);
    await Event.update(event.id).set({
      quota: event.quota - 1,
    }).fetch();
    return res.status(200).json();
  },
  cancelEvent: async function (req, res) {
    var event = await Event.findOne({
      id: req.body.eventId
    });
    var user = await User.findOne({
      username: req.session.username
    });
    await User.removeFromCollection(user.id, 'registered').members(req.body.eventId);
    await Event.update(event.id).set({
      quota: event.quota + 1,
    }).fetch();
    res.status(200);
    return res.json();
  },
};
