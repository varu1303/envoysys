const express = require('express');
const app = express();

//DB connection
const con = require('./server/config/sqlConnect');

//to read JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//routes
const adminRoutes = require('./server/routes/admin/adminRoute');
const empRoutes = require('./server/routes/employee/empRoute');
app.use('/admin', adminRoutes);
app.use('/emp', empRoutes);


con.connect(function(err) {
  if (err) console.log('error in DB connect');
  else {
    console.log("Connected!");
    app.listen(process.env.PORT || 3000, () => {
      console.log('Listening on port 3000');
    })
    /* Table created first time */
    // Creating table 
    // var sql = "CREATE TABLE employees (name VARCHAR(255), password VARCHAR(10), emailId VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //   if (err) 
    //     console.log('error in creating table');
    //   else
    //     console.log("Table created");
    // });
  }
});

