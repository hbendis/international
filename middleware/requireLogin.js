const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/dev");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  
  
  
  if(!authorization) {
    authorization = req.query.token
    
 }
 if(!authorization) {
  return res.status(401).json({ error: "you must be logged in" });

 }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be Logged in" });
    }

    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};



///user/activate?token=1234566
//req.query
//req.query = { token: 1234566 }