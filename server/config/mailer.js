const nodemailer = require('nodemailer');

const {emailId, password} = require('./email-cred');

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
      user: emailId, // Your email id
      pass: password // Your password
  }
});

module.exports = {
  
  sendPassMail: (employee) => {
  
    return new Promise((resolve, reject) => {

        const link = `http://localhost:3000/${employee.emailId}/${employee.genpassword}`;
        
        let mailOptions = {
                from: emailId, // sender address
                to: employee.emailId, // list of receivers
                subject: 'Password Setup - envosys', // Subject line
                html: `<h2>Welcome to Envoysys!</h2><p>Link to set your password ${link}</p>`
            };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('sent');
            }
        }); 
        
    });
  }
}