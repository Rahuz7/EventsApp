const rabbitmq = require('../../mqrabbit');
const paymentStepEvent = (data, connectedSockets) => {


    console.log('[PaymentService - Process Payment step 2 UserInfo] [DATA]', data)

    const dataTmp = {
        id:data.id,
        providedData: {
            ...data.providedData
        },
        pipeline: "event-api",
        action: "createBasket",
        nextPipeline: "entrypoint",
        nextAction: "paymenEmailStep"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp));
    //connectedSockets[data.id].emit('get-item-response', data.providedData)
   // console.log("complete")
    return {} 
};
  

module.exports = {
    paymentStepEvent
};