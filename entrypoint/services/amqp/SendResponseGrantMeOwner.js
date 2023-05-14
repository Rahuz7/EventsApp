const sendResponseGrantMeOwner = (data, connectedSockets) => {


    console.log('[sendResponseGrantMeOwner - response client] [DATA]', data)


    connectedSockets[data.id].emit('get-grant-query-response', data.providedData)
    console.log("complete")
    return {} 
};
  

module.exports = {
    sendResponseGrantMeOwner
};