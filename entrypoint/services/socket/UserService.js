const rabbitmq = require('../../mqrabbit');

const createUser = (socket, data) => {

    console.log('[UserService - createUser] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "user-api",
        action: "createUser",
        nextPipeline: "entrypoint",
        nextAction: "sendCreateUserResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const login = (socket, data) => {

    console.log('[UserService - createUser] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "user-api",
        action: "login",
        nextPipeline: "entrypoint",
        nextAction: "sendCredential"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const activate = (socket, data) => {

    console.log('[UserService - activate] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "user-api",
        action: "validateUser",
        nextPipeline: "entrypoint",
        nextAction: "sendCredential"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const grantMeEventOwner = (socket, data) => {

    console.log('[UserService - grantMeEventOwner] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "user-api",
        action: "grantMeEventOwner",
        nextPipeline: "entrypoint",
        nextAction: "sendResponseGrantMeOwner"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const giveAccess = (socket, data) => {

    console.log('[UserService - giveAccess] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "user-api",
        action: "giveAccess",
        nextPipeline: "entrypoint",
        nextAction: "sendResponseGiveAccess"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const refreshCredential = (socket, data) => {

    console.log('[UserService - refreshCredential] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "user-api",
        action: "refreshCredential",
        nextPipeline: "entrypoint",
        nextAction: "sendCredential"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}


module.exports = {
    createUser,
    login,
    activate,
    grantMeEventOwner,
    giveAccess,
    refreshCredential
};