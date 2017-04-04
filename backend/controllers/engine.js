const db = require(__dirname + '/../lib/mysql');

exports.search = function(req, res, next) {
  var search_term = req.body.search_term;

  db.query("SELECT post FROM posts", [search_term], function(err, rows){
    if(err){
      return next(err);
    }
    if(!rows.length){
      return console.log("Nothing found");
    }

    return res.send(rows);
  });
}
