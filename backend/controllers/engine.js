const db = require(__dirname + '/../lib/mysql');

exports.search = function(req, res, next) {
  var search_term = req.body.search_term;

  if(!search_term){
    return res.status(400).send("ERROR: Search bar is empty!");
  }

  db.query("SELECT post FROM posts WHERE MATCH(post) AGAINST (?)", [search_term], function(err, rows){
    if(err){
      return next(err);
    }

    if(!rows.length){
      return res.status(400).send("ERROR: Nothing found!");
    }

    return res.send(rows);
  });
}
