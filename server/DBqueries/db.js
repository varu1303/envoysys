const tableName = require('./../config/tableName');
const db = require('./../config/sqlConnect');
const { responseObj } = require('./../config/response');
const { sendPassMail } = require('./../config/mailer');

module.exports = {
  registerEmployee: employee => {
    const sql = `INSERT INTO ${tableName} (emailId, password) VALUES ('${employee.emailId}','${employee.password}');`
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.log('error', err)
          reject(responseObj('Error in saving details'));
        } else {
          sendPassMail(employee);
          resolve(responseObj('Employee saved'));
        }
      });
    })

  },

  validateEmployee: employeeEmail => {
    const sql = `SELECT password FROM ${tableName} WHERE emailId = '${employeeEmail}'`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].password);
        }
      });
    })

  },

  setPassword: (newPass, emailId) => {
    const sql = `UPDATE ${tableName} SET password = '${newPass}' WHERE emailId = '${emailId}'`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  }
}