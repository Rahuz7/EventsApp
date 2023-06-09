import socket from './Socket';
import authHeader from './AuthHeader';

const Send = (event, data) => {
    const headerData = authHeader();
    data.header = headerData;
    localStorage.getItem('user')

    socket.emit(event, data)
}

export default Send;