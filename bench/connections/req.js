var mysql = require('mysql'),
    server;

module.exports = {
  name: 'Connection per request',
  listen: function(options, cb) {
    server = require('http').createServer(function(req, res) {
      var connection = mysql.createConnection({
        user: 'root'
      });
      connection.connect();
      connection.query('SELECT SLEEP(0.01)', function(err) {
        if (err) throw err;
        res.end('slept');
      });
      connection.end();
    });

    server.listen(0, function() {
      cb(null, server.address().port);
    });
  },
  close: function() {
    server.close();
  }
};