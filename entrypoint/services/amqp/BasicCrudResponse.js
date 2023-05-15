const basicCrudResponse = (data, connectedSockets) => {


    console.log('[basicCrudResponse - response client] [DATA]', data)


    connectedSockets[data.id].emit('get-crud-response', data.providedData)
    console.log("complete")
    return {} 
};
  

module.exports = {
    basicCrudResponse
};