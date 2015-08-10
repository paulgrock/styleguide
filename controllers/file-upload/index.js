'use strict';
module.exports = function(router) {
  router.post('/', function(req, res) {
    res.redirect('/');
  });
};
