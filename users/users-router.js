const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole('development'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkRole(role) {
  return function (req, res, next) {
    if (req.token && role === req.token.department) {
      next()
    } else {
      res.status(403)
        .json({ message: `Not authorized to access, you must be a ${role}` }) 
    }
  };
};

module.exports = router;
