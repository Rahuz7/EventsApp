const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const login = async (data) => {

    let providedData = {
        success: false,
        message: "erreur d'authentification"
    }
    try {
        console.log("login provided Data:", data)
        const user = await User.findOne({
            where: {
            username: data.username
            }
        })
        if (!user) {
            console.log("user not found")
            return {
                providedData
            }
        }

        var passwordIsValid = bcrypt.compareSync(
            data.password,
            user.password
        );
        console.log("data.password", data.password)
        console.log("user.password", user.password)
        console.log("valid ?", passwordIsValid)
        if (!passwordIsValid) {
            console.log("password invalid")
            return {
                providedData
            }
        }
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
    login
};