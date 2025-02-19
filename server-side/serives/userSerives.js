const jwt = require('jsonwebtoken');
const secret = 'saibalaji%$#%^Y%R$';

function  jsonSignToken(user) {
    const payload = {
        id:user.id,
        email:user.email,
        salt:user.salt
    }

    return jwt.sign(payload,secret);
}

function jsonVerifyToken(token) {
 const payload = jwt.verify(token,secret)
 return payload;
}

module.exports = {
    jsonSignToken,jsonVerifyToken
};