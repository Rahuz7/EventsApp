const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const UserInfo = db.userInfo;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const generateToken = require('../module/generator/token/tokenGenerator');
const createOrLinkUserInfo = async (userUuid, userEmail, transaction = null) => {

    try {
        const userInfo = await UserInfo.findOne({
            where: {
                email: userEmail,
                uuid: {
                    [db.Sequelize.Op.not]: null
                }
            }
        }, { transaction: transaction });
        if (!userInfo) {
            const userInfoTmp = await UserInfo.create({
                uuid:  userUuid,
                email: userEmail,
            }, { transaction: transaction })
        } else {
            //userInfo.uuid = userUuid;
            userInfo.setUuid(userUuid, { transaction: transaction })
            await userInfo.save()
        }
    } catch (e) {
        throw e;
    }
}

const  createUser = async (data) => {
    console.log("createUser data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la création de l'utilisateur."
    }

    try {

        const uuid = generateToken();
        const activationToken = generateToken();
        const activationTokenUuid = generateToken();
  

        const existingUser = await User.findOne({
            where: {
              [db.Sequelize.Op.or]: [
                { activationToken: activationToken },
                { uuid: uuid },
                { activationTokenUuid: activationTokenUuid },
                { email: data.email },
                { isAnonym: true }
              ]
        }})
        if  ( existingUser &&  (!existingUser.isAnonym || (existingUser.isAnonym && existingUser.email != data.email) )) {
            return {
                providedData,
            } 
        }
        const t = await db.sequelize.transaction();
 
        if (existingUser) {
            try {
               await existingUser.update(
                {
                    username: data.username,
                    email: data.email,
                    password: bcrypt.hashSync(data.password, 8),
                    isActive: false,
                    activationToken: activationToken,
                    activationTokenUuid: activationTokenUuid,
                    isClosed: false,
                    isAnonym: false,
                    roles: [1]
                }, { transaction: t })
               await createOrLinkUserInfo(existingUser.uuid, existingUser.email, t)
               await t.commit();
            } catch (e) {
                await t.rollback();
            }
            providedData.success = true
            providedData.message = "Votre compte utilisateur à été appairé avec succés."
            providedData.activationToken = activationToken
            providedData.activationTokenUuid = activationTokenUuid
            providedData.email = data.email
            providedData.username = data.username   
            return {
                providedData,
            } 
        }
    
        try {
 
            const user = await User.create({
                uuid:uuid,
                username: data.username,
                email: data.email,
                password: bcrypt.hashSync(data.password, 8),
                isActive: false,
                activationToken: activationToken,
                activationTokenUuid: activationTokenUuid,
                isClosed: false,
                isAnonym: false
            }, { transaction: t })
            console.log('END WALL')
            if (data.roles) {
            console.log('data.roles')
            const roles = await Role.findAll({
                    where: {
                    name: {
                        [Op.or]: data.roles
                    }
                    }}, { transaction: t })
                    console.log('before  data.roles 1')
                await user.setRoles(roles, { transaction: t })
                console.log('after  data.roles 1')
            } else {
                console.log('after  data.roles 2')
                await user.setRoles([1], { transaction: t });
                console.log('before  data.roles 2')
            }
            console.log('createOrLinkUserInfo')
            await createOrLinkUserInfo(uuid, data.email, t)
            console.log('before commit')
            await t.commit();
            console.log('commited')
        } catch (e) {
            await t.rollback();
            throw e
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
        createUser
};


