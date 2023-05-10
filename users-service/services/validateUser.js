const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const validateUser = async (data) => {

    let providedData = {
        success: false,
        message: "erreur de validation utilisateur"
    }
    try {
        console.log("validateUser provided Data:", data)
        const user = await User.findOne({
            where: {
                [Op.and]: [      
                    {
                        activationToken: {
                            [db.Sequelize.Op.like]: `%${data.token}%`,
                        }},
                    {
                        activationTokenUuid: {
                            [db.Sequelize.Op.like]: `%${data.uuid}%`,
                    }}
                ],
              },
        })
        if (!user) {
            console.log("user not found")
            return {
                providedData
            }
        }
        if (user.isActive) {
            return {
                providedData
            }
        }
        user.isActive = true;
        await user.save();
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        const roles = await user.getRoles()
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        providedData = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            success:true,
            message: "Authentification réussie"
        };
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
    validateUser
};