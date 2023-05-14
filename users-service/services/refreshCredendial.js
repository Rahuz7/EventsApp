const db = require("../models");
const {hasAuthority, verifyToken} = require('../module/security/authority');
const generateToken = require('../module/generator/token/tokenGenerator');
const rabbitmq = require('../utils/mqrabbit');
const User = db.user;
const GrantQuery = db.grantQuery;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const  refreshCredential = async (data) => {
    console.log("GrantMeEventOwner data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la demande d'accès organisateur."
    }

    try {
   
      if (!(await hasAuthority(data, "ROLE_USER"))) {
            console.log('AUTHORITY FAILED')
            providedData.message = "Authorisation non suffisante"
            return { providedData }
      }
      console.log('log result hasAuthority', hasAuthority(data, "ROLE_USER"), !hasAuthority(data, "ROLE_USER"))
      let token = data.header["x-access-token"];
    
      if (!token) {
          return {
              providedData,
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
  
      const user = await User.findOne({
        where: {
        id: userId
        }
      })
      
     if (!user || !user.uuid) {
        return {
            providedData,
        }
     }
     if (!user.isActive) {
        providedData.message = "Compte inactif";
        return {
            providedData
        }
    }
    if (user.isClosed) {
        providedData.message = "Compte désactivé";
        return {
            providedData
        }
    }
    var tokenId = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    var authorities = [];
    const roles = await user.getRoles()
    for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    var authoritiesToken = jwt.sign({ roles: authorities }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    var userUuidToken = jwt.sign({ uuid: user.uuid }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    providedData = {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: tokenId,
        authoritiesToken: authoritiesToken,
        userUuidToken: userUuidToken,
        success:true,
        message: "Actualisation identifiants réussie"
    };
    return {
        providedData
    }

    } catch (e) {
        console.log("erreur catch", e)
        return {
            providedData
        }
    }
}

module.exports = {
    refreshCredential
};