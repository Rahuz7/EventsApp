const db = require("../models");
const config = require("../config/auth.config");
const {hasAuthority, verifyToken} = require('../module/security/authority');
const User = db.user;
const UserInfo = db.userInfo;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const generateToken = require('../module/generator/token/tokenGenerator');
const createOrLinkUserInfo = async (data, transaction = null) => {

    try {

       
        const userInfo = await UserInfo.findOne({
            where: {
                    uuid: data.userUuid   
            }
        }, { transaction: transaction });
        if (userInfo) {
            await userInfo.update({
                uuid:  data.userUuid,
                email: data.email,
                firstName: data.firstName || " ",
                lastName: data.lastName || " ",
                zipCode: data.zipCode || " ",
                adresse: data.address || " ",
                country: data.country || " "
            }, { transaction: transaction })
        } else {
            const userInfoTmp = await UserInfo.create({
                uuid:  data.userUuid ,
                email: data.email,
                firstName: data.firstName || " " ,
                lastName: data.lastName || " ",
                zipCode: data.zipCode || " ",
                adresse: data.address || " ",
                country: data.country || " "
            }, { transaction: transaction })
        }

    }
     catch (e) {
        throw e;
    }
}

const  createAnonymUser = async (data) => {
    console.log("createUser data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la création de l'utilisateur."
    }

    try {
        let token = data.header["x-access-token"];

        if (token) {
            const decoded = await verifyToken(data.header.userUuidToken, config.secret);
            const decodedUuid = decoded.uuid
            console.log('DECODED DEBUG', decoded, decodedUuid)
            if (decodedUuid) {
                const userTmp = await User.findOne({
                    where: {
                         uuid: decodedUuid 
                }})
                if (userTmp) {
                    data.email = userTmp.email
                }
            }

        }
        console.log("AFTER DECODED /////////////", data)
        const alreadyAnonym = await User.findOne({
            where: {
              [db.Sequelize.Op.and]: [
                { email: data.email },
                { isAnonym: true }
              ]
        }})
        if (alreadyAnonym) {
            const userAnonymInfo = await UserInfo.findOne({
                where: {
                    uuid: alreadyAnonym.uuid }
                
            })


            providedData = data;
            providedData.success = true;
            providedData.userUuid = userAnonymInfo.userUuid
            providedData.message = "Info compte récupérée  avec succés."
            return {
                providedData,
            } 
        }
        const uuid = generateToken();

  
        const existingUserUuid = await User.findOne({
            where: {
  
                uuid: uuid

        }})

        if (existingUserUuid) {
            providedData.message = "error existing uuid"
            return {
                providedData,
            } 
        }
        const existingUser = await User.findOne({
            where: {
              [db.Sequelize.Op.and]: [
                { email: data.email },
                { isAnonym: false }
              ]
        }})


        if  ( existingUser) {

            const userInfo = await UserInfo.findOne({
                where: {
                        uuid: existingUser.uuid   
                }
            });

            userInfo.update({
                email: data.email,
                firstName: data.firstName || " " ,
                lastName: data.lastName || " ",
                zipCode: data.zipCode || " ",
                adresse: data.address || " ",
                country: data.country || " "
            })

            providedData = data;
            providedData.success = true
            providedData.userUuid = userInfo.userUuid
            providedData.message = "Info compte récupérée  avec succés."
            return {
                providedData,
            } 
        }
        const t = await db.sequelize.transaction();
 
        try {
 
            const user = await User.create({
                uuid:uuid,
                email: data.email,
                isActive: false,
                isClosed: false,
                isAnonym: true
            }, { transaction: t })
            if (data.roles) {
            const roles = await Role.findAll({
                    where: {
                    name: {
                        [Op.or]: data.roles
                    }
                    }}, { transaction: t })
                await user.setRoles(roles, { transaction: t })
            } else {
                await user.setRoles([1], { transaction: t });
            }
            console.log('createOrLinkUserInfo')
            data.userUuid = uuid;
            await createOrLinkUserInfo(data, t)
            console.log('before commit')
            await t.commit();
            console.log('commited')
        } catch (e) {
            await t.rollback();
            throw e
        }
            
        
        providedData = data;
        data.userUuid = uuid;
        providedData.success = true
        providedData.message = "Compte anonyme créee avec succé."

        return {
            providedData,
        } 
    } catch(e) {
        console.log('erreur:', e)
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
    createAnonymUser
};

