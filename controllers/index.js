'use strict';

// const IndexModel = require('../models/index');

module.exports = function(router) {
  // const model = new IndexModel();
  const model = {};
  model.title = 'CSS Styleguide Helper';

  router.get('/', function(req, res) {
    res.render(req.url, model);
  });
};
