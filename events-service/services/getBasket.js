const db = require("../models");
const {paginate} = require('../module/sequelize/paginator');
const Event = db.Event;
const Basket = db.Basket;
const EventType = db.EventType;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const {hasAuthority, verifyToken} = require('../module/security/authority');
const Decimal = require('decimal.js');
const generateToken = require('../module/generator/token/tokenGenerator');
const  getBasket = async (data) => {
    console.log("getBasket data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la récupération des commandes."
    }

    try {

      
      if (!(await hasAuthority(data, "ROLE_USER"))) {
            providedData.message = "Authorisation non suffisante"
            return { providedData }
      }
      const decoded = await verifyToken(data.header.userUuidToken, config.secret);
      const decodedUuid = decoded.uuid;
      console.log('id décodé', decodedUuid)
      if (!decodedUuid) {
          return {
              providedData,
          }
      }

      let baskets = await db.Basket.findAll({
        attributes: ['totalPrice', 'nbItem', 'nbSubItem', 'orderUuid', 'billingDate'],
        where: {
            clientUuid: decodedUuid
        }
      })
      providedData.baskets = baskets;
      providedData.success = true;
      providedData.message = "récupération des commandes réalisé."
      console.log("STEP 8")
      return {
        providedData
      }

    } catch (e) {
        console.log('get my events error catch', e)
        return {
            providedData
        }
    }
}

module.exports = {
    getBasket
};