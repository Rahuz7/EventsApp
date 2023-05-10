const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const  createUser = async (data) => {
    console.log("createUser data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la création de l'utilisateur."
    }

    try {
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: bcrypt.hashSync(data.password, 8),
            nom: data.nom,
            prenom: data.prenom,
            telephone: data.telephone
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