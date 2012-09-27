var mysql = require('mysql'),
    pool = [],
    current = 0,
    size = 10,
    server;

module.exports = {
  name: 'Connection pool',
  listen: function(options, cb) {
    for (var i=0; i<size; i++) {
      var connection = mysql.createConnection({
        user: 'root'
      });
      connection.connect();
      pool.push(connection);
    }

    server = require('http').createServer(function(req, res) {
      pool[current].query('SELECT SLEEP(0.01)', function(err) {
        if (err) throw err;
        res.end('slept');
      });
      if (++current >= size) current = 0;
    });

    server.listen(0, function() {
      cb(null, server.address().port);
    });
  },
  close: function() {
    server.close();
    pool.forEach(function(connection) {
      connection.end();
    });
  }
};