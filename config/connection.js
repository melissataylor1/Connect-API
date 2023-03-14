const { connect, connection } = require('mongoose');

connect('mongodb://localhost/connect-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;