const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

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


const letPass = async (data, requiredRole) => {

    let token = data.authoritiesToken

    if (!token) {
        return false
    }
    let roles = null
    const decoded = await verifyToken(token, config.secret);
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
  
testAuthority = async (data) => {
    let providedData = {
        success: false,
        message: "Erreur."
    }
    try {
        if (!letPass(data, "ROLE_USER")) {
            providedData.message = "Authorisation non suffisante"
            return { providedData }
        }


        return {
            providedData,
        }
    } catch (e) {
        console.log('Shield error: ', e)
        return {
            providedData,
        }
    }
};

module.exports = {
    testAuthority
};