import io from "socket.io-client";
import { useEffect, useState} from "react";
import { Routes, Route, Switch, Link } from 'react-router-dom';
import Composant1 from './Composant1';
import Composant2 from './Composant2';
import Login from './Login';
import socket from './Socket';
import Panel from './Panel';
import SignUp from './SignUp';
import Shield from './ShieldMockup'
//const socket = io.connect("http://localhost:8001");
//const socket = "hello";
function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(localStorage.getItem('user'));
    setUsername(user.username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("user");
  };



  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
};

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (user != null && user.username != null) {
      setIsLoggedIn(true)
      setUsername(user.username)
    }
    socket.on("notification", (data) => {
      incrementCount();
    });
  }, [socket]);

  return (
    <div>
      
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Composant 1</Link>
                      </li>
                     
                      {isLoggedIn &&  <li> <Link to="/shield">Test shield</Link></li>}
                      <li> <Link to="/signup">Signup</Link></li>
                      <li>
                          <Link to="/composant2">Composant 2</Link>

                          {isLoggedIn ? (

                              <button onClick={logout}> Logout - {username}</button>
                            ) : (
                              <Link to="/login">Login</Link>
                            )}
                          
                      </li>
                      <li> Notification: {count}
                      </li>
                  </ul>
              </nav>
              <Routes>   
                    <Route path="/" element={<Composant1 />} />
                    <Route path="/panel/*" element={<Panel />} />
                    <Route path="/composant2" element={<Composant2 />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/shield" element={<Shield />} />
              </Routes>
          </div>
     
    </div>
  );
}

export default App;



//import io from 'socket.io-client';
//const socketUrl = 'https://localhost:8001';

//const socket = io('https://localhost:8001');
//const socket2 = io('https://localhost:8001');