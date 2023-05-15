import authHeader from './AuthHeader';

const Send = (event, data, socket) => {
    const headerData = authHeader();
    data.header = headerData;
    localStorage.getItem('user')
    socket.emit(event, data)
}

export default Send;