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

module.exports = {
    createUser,
    login
};