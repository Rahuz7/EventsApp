const rabbitmq = require('../../mqrabbit');

const sendCreateUserResponse = (data, connectedSockets) => {


    console.log('[UserCration - sendEmail] [DATA]', data)

    const dataTmp = {
        id:data.id,
        providedData: {
            template: "accountCreation",
            recipient: data.providedData.email,
            subject: "Confirmation création de compte",
            variables: {
                name: data.providedData.username,
                token:  data.providedData.activationToken,
                uuid: data.providedData.activationTokenUuid
            }
        },
        pipeline: "email-api",
        action: "userValidationEmail"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 
    connectedSockets[data.id].emit('get-user-creation-response', data.providedData)
    return {} 
};
  

module.exports = {
    sendCreateUserResponse
};