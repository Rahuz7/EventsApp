import io from "socket.io-client";
import { useEffect, useState} from "react";
import { Routes, Route, Switch, Link } from 'react-router-dom';
import Composant1 from './Composant1';
import Composant2 from './Composant2';
//import Login from './Login';
import socket from './Socket';
import Panel from './Panel';
import SignUp from './SignUp';
import Shield from './ShieldMockup'
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Signup from "./components/signup.component";
import Login from "./components/login.component";
import ActivateAccount from "./components/accountActivation.component";
import Footer from "./components/footer.component";
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
              <Navbar isLoggedIn={isLoggedIn} />
              <Routes> 
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Composant1 />} />
                    <Route path="/panel/*" element={<Panel />} />
                    <Route path="/login" element={ <Login onLogin={handleLogin} />  } />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/shield" element={<Shield />} />
                    <Route path="/activate" element={<ActivateAccount onLogin={handleLogin} />} />
              </Routes>
              <Footer />
          </div>
     
    </div>
  );
}

export default App;



//import io from 'socket.io-client';
//const socketUrl = 'https://localhost:8001';

//const socket = io('https://localhost:8001');
//const socket2 = io('https://localhost:8001');