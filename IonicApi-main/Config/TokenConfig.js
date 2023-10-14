const jwt = require('jsonwebtoken');
require('dotenv').config();


function verifyToken(req, res, next) {
    if(req.headers.authorization==null)
    return  res.status(401).send("you should authenticated first");
  const token = req.headers.authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET_KEY;

  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      res.sendStatus(401);
    } else {
      req.userId = decoded._id;
      next();
    }
  });
}

module.exports=verifyToken;