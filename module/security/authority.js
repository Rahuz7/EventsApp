const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };


const hasAuthority = async (data, requiredRole) => {
    console.log('authority module data ', data)
    if (!data || !data.header) {
        return false
    }

    let token = data.header.authoritiesToken

    if (!token) {
        return false
    }
    let roles = null
    const decoded = await verifyToken(token, config.secret);
    console.log('authority module decoded :', decoded)
    if (!decoded) {
        return false
    }
    roles = decoded.roles;
    if (!roles) {
        return false
    }
    for (let i = 0; i < roles.length; i++) {

        if (roles[i] === requiredRole) {
            return true
        }
    }

    return false
}


module.exports = {hasAuthority, verifyToken};