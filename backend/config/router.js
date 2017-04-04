'use strict';

const engine = require(__dirname + '/../controllers/engine');

module.exports = function(router){

  //engine
  router.post('/search', engine.search);

  return router;
};
