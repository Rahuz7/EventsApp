const db = require("../models");
const {hasAuthority, verifyToken} = require('../module/security/authority');
const generateToken = require('../module/generator/token/tokenGenerator');
const rabbitmq = require('../utils/mqrabbit');
const User = db.user;
const GrantQuery = db.grantQuery;
const config = require("../config/auth.config");

const  grantMeEventOwner = async (data) => {
    console.log("GrantMeEventOwner data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la demande d'accès organisateur."
    }

    try {

      if (!(await hasAuthority(data, "ROLE_USER"))) {
            providedData.message = "Authorisation non suffisante"
            return { providedData }
      }

      let token = data.header["x-access-token"];
    
      if (!token) {
          return {
              providedData,
          }
      }
      console.log('token existe')
      let userId = null
      const decoded = await verifyToken(token, config.secret);
      userId = decoded.id;
      console.log('id décodé', userId)
      if (!userId) {
          return {
              providedData,
          }
      }
  
    console.log('id existe')
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
     console.log('user existe', user)
     const uuid = generateToken();
     const validationToken = generateToken();
     let grantQuery = await GrantQuery.findOne({
        where: {
            [db.Sequelize.Op.or]: [
                { uuid: uuid },
                { userUuid: user.uuid },
                { validationToken: validationToken }
              ]
        }
      })
      console.log('grant query trouvée', grantQuery)
      if (grantQuery) {
            return {
                providedData
            }
      }
      
    const t = await db.sequelize.transaction();
    
    try {
        console.log('debut transaction')
        grantQuery = await GrantQuery.create({
            uuid: uuid,
            userUuid: user.uuid,
            validationToken: validationToken,
            isValidated: false
        }, { transaction: t })
        console.log('grant query créée', grantQuery)

        const dataTmp = {
            providedData: {
                template: "grantMeEventOwner",
                recipient: "admin@ev.fr",
                subject: "Demande accès organisateur",
                variables: {
                    email: user.email,
                    token:  validationToken,
                }
            },
            pipeline: "email-api",
            action: "grantMeEventOwner"
        }
        console.log('data setup for email api', dataTmp)
        rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp));
        console.log('message send to email-api')
        await t.commit();
        console.log('transaction commit')
    } catch (e) {
        console.log("erreur catch transaction", e)
        await t.rollback();
    }
    providedData.success = true;
    providedData.message = "Demande d'accès organisateur envoyée avec succés."
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
    grantMeEventOwner
};