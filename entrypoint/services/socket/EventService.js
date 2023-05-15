const rabbitmq = require('../../mqrabbit');

const getMyEvent = (socket, data) => {

    console.log('[EventService - getMyEvent] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "getMyEvents",
        nextPipeline: "entrypoint",
        nextAction: "sendGetMyEventResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

module.exports = {
    getMyEvent
};