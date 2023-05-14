const sendGetMyEventResponse = (data, connectedSockets) => {


    console.log('[sendGetMyEventResponse - response client] [DATA]', data)


    connectedSockets[data.id].emit('get-my-event', data.providedData)
    console.log("complete")
    return {} 
};
  

module.exports = {
    sendGetMyEventResponse
};