/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    login: async function (req, res) {
        if (req.method == "GET") return res.redirect('/');
        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();
        var user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401);
            return res.send("User not found");
        }
        const match = await sails.bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }
        req.session.regenerate(function (err) {
            if (err) return res.serverError(err);
            req.session.username = req.body.username;
            sails.log("Login successfully. \n Session: " + JSON.stringify(req.session));
            // res.status(401);
            //return res.ok("Login successfully");
            return res.redirect('/');
            // return res.json(req.session);
        });
    },
    logout: async function (req, res) {
        req.session.destroy(function (err) {
            if (err) return res.serverError(err);
            return res.redirect('/');
        });
    },
    registerEvent: async function (req, res) {
        var event = await Event.findOne({ id: req.body.eventId });
        var user = await User.findOne({ username: req.session.username });
        await User.addToCollection(user.id, 'registered').members(req.body.eventId);
        await Event.update(event.id).set({
            quota: event.quota - 1,
        }).fetch();
        res.status(200);
        return res.json();
    },
    cancelEvent: async function (req, res) {
        var event = await Event.findOne({ id: req.body.eventId });
        var user = await User.findOne({ username: req.session.username });
        await User.removeFromCollection(user.id, 'registered').members(req.body.eventId);
        await Event.update(event.id).set({
            quota: event.quota + 1,
        }).fetch();
        res.status(200);
        return res.json();
    },
    // TODO: 写入登记和取消事件的函数 注意要在policies里规定 只有存在session 的情况下可以访问这俩个接口
};