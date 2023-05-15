const genericSingleItemResponse = (data, connectedSockets) => {


    console.log('[genericSingleItemResponse - response client] [DATA]', data)


    connectedSockets[data.id].emit('get-item-response', data.providedData)
    console.log("complete")
    return {} 
};
  

module.exports = {
    genericSingleItemResponse
};