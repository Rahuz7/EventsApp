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

const getEvent = (socket, data) => {

    console.log('[EventService - getEvent] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "getEvent",
        nextPipeline: "entrypoint",
        nextAction: "genericSingleItemResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const editEvent = (socket, data) => {

    console.log('[EventService - editEvent] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "editEvent",
        nextPipeline: "entrypoint",
        nextAction: "basicCrudResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const deleteEvent = (socket, data) => {

    console.log('[deleteEvent - addEvent] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "deleteEvent",
        nextPipeline: "entrypoint",
        nextAction: "basicCrudResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const getAllEvent = (socket, data) => {

    console.log('[EventService - getAllEvent] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "getAllEvent",
        nextPipeline: "entrypoint",
        nextAction: "sendGetMyEventResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}



module.exports = {
    getMyEvent,
    addEvent,
    getEventType,
    getEvent,
    editEvent,
    deleteEvent,
    getAllEvent
};