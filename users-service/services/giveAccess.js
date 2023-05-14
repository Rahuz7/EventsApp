const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const GrantQuery = db.grantQuery;

const giveAccess = async (data) => {

    let providedData = {
        success: false,
        message: "erreur d'authentification"
    }
    try {
        console.log("login provided Data:", data)
        if (!data.token) {
            return {
                providedData
            }
        }
        const grantQuery = await GrantQuery.findOne({
            where: {
                validationToken: data.token
            }
        })
        console.log('query ok', grantQuery)
        if (!grantQuery) {
            return {
                providedData
            }
        }


        const user = await User.findOne({
            where: {
                uuid: grantQuery.userUuid
            }
        })
        console.log('userOk', user)
        if (!user) {
            return {
                providedData
            }
        }
        
        await user.addRoles(2);
        console.log('addrole ok')
        await user.save();
        console.log('user save ok')
        await grantQuery.update({
            isValidated: true
        })
        providedData.email = user.email
        providedData.username = user.username   
        providedData.success = true
        providedData.message = "Utilisateur est promu organisateur";
        return {
            providedData
        }
    } catch (e) {
        console.log("Error: ", e)
        return {
            providedData
        } 
    }
}

module.exports = {
    giveAccess
};