const sendCredential = (data, connectedSockets) => {

    connectedSockets[data.id].emit('fetch-credential', data.providedData)
    return {} 
};
  

module.exports = {
    sendCredential
};