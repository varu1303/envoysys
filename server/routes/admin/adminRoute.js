const { registerEmployee } = require('./../../DBqueries/db');
const { generateHash } = require('./../middlewares/hashPassword');
const generatePassword = require('./../middlewares/firstPassword');

const express = require('express');
var router = express.Router();

// isLoggedIn and isAdmin middleware to be added later for authentication
router.post('/registeremployee', (req,res) => {
  const employee = req.body;
  employee.genpassword = generatePassword()
  generateHash(employee.genpassword)
    .then(hash => {
      employee.password = hash;
      return employee;
    })
    .then(employee => registerEmployee(employee))
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  
})

module.exports = router;