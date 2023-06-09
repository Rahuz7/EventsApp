const db = require("../models");
const {paginate} = require('../module/sequelize/paginator');
const Event = db.Event;
const EventType = db.EventType;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const {hasAuthority, verifyToken} = require('../module/security/authority');

const  getEvent = async (data) => {
    console.log("getEvent data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant la récupération de l'évènement."
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

      const event = await Event.findOne({
        attributes:  ['id', 'title', 'description', 'location' , ['date_debut', 'dateDebut'], ['date_fin', 'dateFin'], 'price', 'place'],
        where: {
            [db.Sequelize.Op.and]: [
                { id: data.id },
                { ownerUuid: decodedUuid },

              ]
        },
        include: EventType 
      })

      providedData.event = event;     
      providedData.success = true;
      providedData.message = "Event récupéré avec succés"
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
    getEvent
};