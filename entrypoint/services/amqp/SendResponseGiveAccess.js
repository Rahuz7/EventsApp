const rabbitmq = require('../../mqrabbit');

const sendResponseGiveAccess = (data, connectedSockets) => {


    console.log('[UserCration - sendResponseGiveAccess] [DATA]', data)

    const dataTmp = {
        id:data.id,
        providedData: {
            template: "giveAccessEmail",
            recipient: data.providedData.email,
            subject: "Je veux devenir organisateur réponse",
            variables: {
                name: data.providedData.username
            }
        },
        pipeline: "email-api",
        action: "giveAccessEmail"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 
    connectedSockets[data.id].emit('get-give-access-response', data.providedData)
    return {} 
};
  

module.exports = {
    sendResponseGiveAccess
};