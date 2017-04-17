const db = require(__dirname + '/../lib/mysql');

exports.search = function(req, res, next) {
  var search_term = req.body.search_term;
  var array_term = search_term.split(" ");

  if(!search_term){
    return res.status(400).send("ERROR: Search bar is empty!");
  }

  var sql_expansion = "SELECT post, MATCH(post) against (? WITH QUERY EXPANSION) AS relevance FROM posts WHERE MATCH(post) against(? WITH QUERY EXPANSION) > 0 ORDER BY relevance DESC, score DESC LIMIT 50"
  var sql_normal = "SELECT post, MATCH(post) against (?) AS relevance FROM posts WHERE MATCH(post) against(?) > 0 ORDER BY relevance DESC, score DESC  LIMIT 50"
  var sql = "";

  if(array_term.length < 2){
    sql = sql_expansion;
  }else{
    sql = sql_normal;
  }

  db.query(sql, [search_term, search_term], function(err, rows){
    if(err){
      return next(err);
    }

    if(!rows.length){
      return res.status(400).send("ERROR: Nothing found!");
    }

    return res.send(rows);
  });
}
