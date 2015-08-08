'use strict';
module.exports = function(router) {
  router.post('/', function(req, res) {
    console.log(req);
    res.redirect('/');
  });
};
