const db = require("../models");
const {paginate} = require('../module/sequelize/paginator');
const Event = db.Event;
const EventType = db.EventType;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const {hasAuthority, verifyToken} = require('../module/security/authority');
const Decimal = require('decimal.js');

const  addEvent = async (data) => {
    console.log("addEvent data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la création de l'évènement."
    }

    try {
      if (!(await hasAuthority(data, "ROLE_ORGANISATEUR"))) {
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

      const event = Event.create({
        ownerUuid: decodedUuid,
        title: data.title,
        description: data.description,
        location: data.location,
        date_debut: data.dateDebut,
        date_fin: data.dateFin,
        price: new Decimal(data.price),
        place: data.place,
        eventTypeId: data.eventType
      })
      
      providedData.success = true;
      providedData.message = "Events crée avec succés"
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
    addEvent
};