const rabbitmq = require('../../mqrabbit');
const paymenEmailStep = (data, connectedSockets) => {


    console.log('[paymenEmailStep - Process Payment step 3 Email] [DATA]', data)

    const dataTmp = {
        id:data.id,
        providedData: {
            template: "paymentSuccess",
            recipient: data.providedData.email,
            subject: "Résumé de votre commande",
            variables: {
                email: data.providedData.email,
                orderId: data.providedData.orderId,
                totalPrice: data.providedData.totalPrice,
                nbItem: data.providedData.nbItem,
                nbSubItem: data.providedData.nbSubItem
            }
        },
        pipeline: "email-api",
        action: "paymentSuccess"
    }
    rabbitmq.sendTo(dataTmp.pipeline, JSON.stringify(dataTmp)); 
    connectedSockets[data.id].emit('get-payment-response', data.providedData)
    //connectedSockets[data.id].emit('get-item-response', data.providedData)
   // console.log("complete")
    return {} 
};
  

module.exports = {
    paymenEmailStep
};