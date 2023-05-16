const db = require("../models");
const {paginate} = require('../module/sequelize/paginator');
const Event = db.Event;
const EventType = db.EventType;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const {hasAuthority, verifyToken} = require('../module/security/authority');
const Decimal = require('decimal.js');

const  editEvent = async (data) => {
    console.log("editEvent data:", data)
    let providedData = {
        success: false,
        message: "Erreur durant l'édition de l'évènement."
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

      const currentDate = new Date().toISOString().split('T')[0];

      if (data.dateDebut < currentDate) {
        providedData.message = "Date de début antérieure à la date actuelle"
        return {
          providedData
        }
      } 

      if ( data.dateFin < data.dateDebut) {
        providedData.message = "Date de fin antérieure à la date de début"
        return {
          providedData
        }
      } 



      const event = await Event.findOne({
        where: {
            [db.Sequelize.Op.and]: [
                { id: data.id },
                { ownerUuid: decodedUuid },

              ]
        }
      });

      if (event) {
        // Mettre à jour les attributs de l'événement existant
        event.ownerUuid = decodedUuid;
        event.title = data.title;
        event.description = data.description;
        event.location = data.location;
        event.date_debut = data.dateDebut;
        event.date_fin = data.dateFin;
        event.price = new Decimal(data.price);
        event.place = data.place;
        event.eventTypeId = data.eventType;
      
        // Enregistrer les modifications dans la base de données
        await event.save();
      
        // Event édité avec succès
        // ...
      } else {
        return {
            providedData
          }
        // L'événement n'a pas été trouvé
        // ...
      }
 
      providedData.success = true;
      providedData.message = "Events édité avec succés"
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
    editEvent
};