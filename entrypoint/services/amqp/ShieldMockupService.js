const shieldMockupService = (data, connectedSockets) => {

    connectedSockets[data.id].emit('get-shield-response', data.providedData)
    return {} 
};
  

module.exports = {
    shieldMockupService
};