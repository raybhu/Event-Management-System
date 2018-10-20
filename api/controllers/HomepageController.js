/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    index: async function (req, res) {
        return res.view('pages/homepage', {layout: 'layouts/bootstrap'});

    },
};

