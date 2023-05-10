const sendCreateUserResponse = (data, connectedSockets) => {

    connectedSockets[data.id].emit('get-user-creation-response', data.providedData)
    return {} 
};
  

module.exports = {
    sendCreateUserResponse
};