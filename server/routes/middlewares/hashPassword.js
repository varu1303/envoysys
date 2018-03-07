const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  generateHash: password => bcrypt.hash(password, saltRounds),

  validatePassword: (password, hash) => {
    return bcrypt.compare(password, hash);
  }
}
