var mysql = require('mysql'),
    connection,
    server;

module.exports = {
  name: 'One connection',
  listen: function(options, cb) {
    connection = mysql.createConnection({
      user: 'root'
    });
    connection.connect();

    server = require('http').createServer(function(req, res) {
      connection.query('SELECT SLEEP(0.01)', function(err) {
        if (err) throw err;
        res.end('slept');
      });
    });

    server.listen(0, function() {
      cb(null, server.address().port);
    });
  },
  close: function() {
    server.close();
    connection.end();
  }
};