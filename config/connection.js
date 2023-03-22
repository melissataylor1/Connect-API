const { connect, connection } = require('mongoose');

connect('mongodb://localhost/Connect-API', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;