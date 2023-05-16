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
const  createBasket = async (data) => {
    console.log("createBasket data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la création du panier et le processus de paiement."
    }

    try {

      
      const uuidBasket = generateToken();
      const orderUuid = generateToken();
      console.log("STEP 1")
      let existingBasket = await Basket.findOne({
        where: {
            [db.Sequelize.Op.or]: [
                { uuid: uuidBasket },
                { orderUuid: orderUuid },

              ]
        }
      })
      console.log("STEP 2", existingBasket)
      if (existingBasket) {
        return {
            providedData,
        }
    }
    console.log("STEP 3")
      const t = await db.sequelize.transaction();
      console.log('transaction begin')
      try {
        console.log("STEP 4")
        let basket = await Basket.create({
            uuid: uuidBasket,
            clientUuid: data.userUuid,
            totalPrice: data.totalPrice,
            nbItem: data.nbItem,
            nbSubItem: data.nbSubItem,
            waitPayment: true,
            billed: false,
            orderUuid: orderUuid,
            billingDate: new Date()
        },{ transaction: t })
        console.log("STEP 5")
        t.commit()
        console.log("STEP 6")

      } catch (e) {
        
        t.rollback()
        return {
            providedData
          }
      }
      console.log("STEP 7")
      providedData = data;
      providedData.orderId = orderUuid
      providedData.success = true;
      providedData.message = "Panier et payment réalisé."
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
    createBasket
};