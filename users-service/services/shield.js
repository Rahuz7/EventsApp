const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

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

shield = async (data) => {
    let providedData = {
        success: false,
        message: "Authorisation non suffisante."
    }
    try {
        console.log("shield data: ", data)
        let token = data.header["x-access-token"];
    
        console.log('DEBUG///', token)
        if (!token) {
            return {
                providedData,
                action
            }
        }
        let userId = null
        const decoded = await verifyToken(token, config.secret);
        userId = decoded.id;
        if (!userId) {
            return {
                providedData,
            }
        }
        const user = await User.findByPk(userId);

        if (!user) {
            return {
                providedData,
            }
        }

        const roles = await user.getRoles();
        console.log('roles: ', roles)
        console.log('roleRequired: ', data.roleRequired)
        for (let i = 0; i < roles.length; i++) {

            if (roles[i].name === data.roleRequired) {
                console.log("Role match")
                providedData.success = true;
                providedData.message = "Authorisation suffisante."
            }
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
    shield
};