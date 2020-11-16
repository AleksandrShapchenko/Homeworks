const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const db = require('../database/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = db.get('users');
  res.status(200).json({
    status: 'succes',
    data: users,
  }); 

}).post('/', function(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    });
  }

  let usersId = shortid.generate();
  db.get('users').push({...req.body, usersId }).write();

  res.status(200).json({
    status: 'succes',
    data: usersId,
  });

}).delete('/:userId', function(req, res, next) {
  let userId = db.delete('users.userId');
  res.status(200).json({
    status: 'succes',
    data: userId,
  }); 

}).put('/userId', function(req, res, next) {
  let userId = db.put('users');
  res.status(200).json({
    status: 'succes',
    data: data,
  }); 

  console.log(req.users);
  // req.users[req.body.user.id] = req.body.user;

});

module.exports = router;
