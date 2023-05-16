const paymentStepEvent = (data, connectedSockets) => {


    console.log('[PaymentService - Process Payment step 2 UserInfo] [DATA]', data)


    //connectedSockets[data.id].emit('get-item-response', data.providedData)
   // console.log("complete")
    return {} 
};
  

module.exports = {
    paymentStepEvent
};