const genericCollectionResponse = (data, connectedSockets) => {


    console.log('[genericCollectionResponse - response client] [DATA]', data)


    connectedSockets[data.id].emit('get-collection-response', data.providedData)
    console.log("complete")
    return {} 
};
  

module.exports = {
    genericCollectionResponse
};