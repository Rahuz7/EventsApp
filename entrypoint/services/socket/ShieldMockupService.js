const rabbitmq = require('../../mqrabbit');

const authorized = (socket, data) => {

    console.log('[authorizedService - authorized] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data,
            roleRequired: 'user'
        },
        pipeline: "user-api",
        action: "shield",
        nextPipeline: "entrypoint",
        nextAction: "shieldMockupService"
    } 
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const denied = (socket, data) => {

    console.log('[deniedService - denied] [DATA]', data)
    
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data,
            roleRequired: 'moderator'
        },
        pipeline: "user-api",
        action: "shield",
        nextPipeline: "entrypoint",
        nextAction: "shieldMockupService"
    }
    
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

module.exports = {
    authorized,
    denied
};