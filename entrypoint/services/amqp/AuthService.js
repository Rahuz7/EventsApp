const rabbitmq = require('../../mqrabbit');

const sendCredential = (data, connectedSockets) => {

    const dataTmp = {
        id:data.id,
        providedData: {
            ...data.providedData
        },
        pipeline: "event-api",
        action: "testAuthority"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 
    connectedSockets[data.id].emit('fetch-credential', data.providedData)
    return {} 
};
  

module.exports = {
    sendCredential
};