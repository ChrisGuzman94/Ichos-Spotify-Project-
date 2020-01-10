// Defining methods for the login
module.exports = {
  client: function(req, res) {
    res.status(200).json({ client: process.env.CLIENT });
  }
};
