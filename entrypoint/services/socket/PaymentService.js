const rabbitmq = require('../../mqrabbit');

const payment = (socket, data) => {

    console.log('[PaymentService - Process Payment step 1 UserInfo] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "user-api",
        action: "createAnonymUser",
        nextPipeline: "entrypoint",
        nextAction: "paymentStepEvent"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}

const getBasket = (socket, data) => {

    console.log('[PaymentService - getBasket] [DATA]', data)
    const dataTmp = {
        id:socket.id,
        providedData: {
            ...data
        },
        pipeline: "event-api",
        action: "getBasket",
        nextPipeline: "entrypoint",
        nextAction: "genericCollectionResponse"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 

}


module.exports = {
    payment,
    getBasket
};