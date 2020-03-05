const jwt = require('jsonwebtoken');
const privKey = require('../../config/privKey');

async function validToken(req, res, next){
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({error: 'Token required'});
  }

  token = token.replace('Bearer ', '');
  jwt.verify(token, privKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({error: 'Invalid token'});
    }

    req.headers.user = decoded;
    next();
  });

}

function isAdmin(req, res, next){ 
  if (req.headers.user.role !== 'admin') {
    return res.status(401).send({error: 'not enought permisions'});
  }
  next();
}

module.exports = {
  isAdmin,
  validToken
}