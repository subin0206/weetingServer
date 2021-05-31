const jwt = require("jsonwebtoken");
const randToken = require('rand-token');

// const secretKey = require('../config/secretKey');
// var db_config = require(__dirname + '/../config/database.js');
module.exports = {
//   sign: async (user) => {
//     /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
//     const payload = {
//         id: user.user_id,
//         email: user.email,
//     };
//     const result = {
//         //sign메소드를 통해 access token 발급!
//         token: jwt.sign(payload, secretKey.secretKey, secretKey.option),
//         refreshToken: randToken.uid(256)
//     };
//     return result;
// },
  checkToken: (req, res, next) => {
    let token = req.headers['x-access-token']
    if (token) {
      jwt.verify(token, "[Token 값]", (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          console.log(decoded.email,"decoded");
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};