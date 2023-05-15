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

const addEvent = (socket, data) => {

    console.log('[EventService - addEvent] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "addEvent",
        nextPipeline: "entrypoint",
        nextAction: "basicCrudResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const getEventType = (socket, data) => {

    console.log('[EventService - getEventType] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "getEventType",
        nextPipeline: "entrypoint",
        nextAction: "genericCollectionResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

module.exports = {
    getMyEvent,
    addEvent,
    getEventType
};