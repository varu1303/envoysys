const express = require('express');
var router = express.Router();

const { validateEmployee, setPassword } = require('./../../DBqueries/db');
const { validatePassword } = require('./../middlewares/hashPassword');
const { generateJWT, verifyJWT } = require('./../middlewares/jwt');
const { responseObj } = require('./../../config/response');
const { generateHash } = require('./../middlewares/hashPassword');

router.get('/getToken', (req, res) => {
  const emailId = req.header('emailId');
  const reqPassword =  req.header('password');

  validateEmployee(emailId)
    .then(password => {
      validatePassword(reqPassword, password)
        .then(bres => {
          if(bres) {
            res.json(responseObj(generateJWT(emailId)));
          }            
          else 
            res.send('pass not ok');
        })
        .catch(err => {
          console.log(err)
          res.send('error in bcrypt');
        })
    })
    .catch(err => {
      console.log('error', err);
      res.send('not ok');
  })


});

router.post('/setPassword', (req, res) => {
  const decoded = verifyJWT(req.header('x-auth'));
  if(decoded) {
    generateHash(req.body.password)
      .then(hash => {
        setPassword(hash, decoded.data)
          .then(user => {
            res.send('done');
          })
          .catch(err => {
            res.status(401).send(err)
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error)
      })
  } else {
    res.send('incorrect token');
  }



})

module.exports = router;