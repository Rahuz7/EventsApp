const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function generateToken() {
    const length = 30;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return token;
  }


const  createUser = async (data) => {
    console.log("createUser data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la création de l'utilisateur."
    }

    try {
        const activationToken = generateToken()
        const activationTokenUuid = generateToken()
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: bcrypt.hashSync(data.password, 8),
            isActive: false,
            activationToken: activationToken,
            activationTokenUuid: activationTokenUuid
        })
        if (data.roles) {
        const roles = await Role.findAll({
                where: {
                name: {
                    [Op.or]: data.roles
                }
                }})
            await user.setRoles(roles)
        } else {
            await user.setRoles([1]);
        }
        providedData.success = true
        providedData.message = "Votre compte utilisateur à été crée avec succés."
        providedData.activationToken = activationToken
        providedData.activationTokenUuid = activationTokenUuid
        providedData.email = data.email
        providedData.username = data.username   
        return {
            providedData,
        } 
    } catch(e) {
        return {
            providedData,
        } 
    }

      
  /*  providedData = {
        username:'john',
        nom:'doe',
        age:'35',
        token:"ZAUHZAOIUH",
        success: true
    };*/



   
};
  

module.exports = {
    createUser
};