const rabbitmq = require('../../mqrabbit');

const payment = (socket, data) => {

    console.log('[PaymentService - Process Payment step 1 UserInfo] [DATA]', data)
    /*const dataTmp = {
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
*/
}


module.exports = {
    payment
};