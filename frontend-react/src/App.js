import { useEffect, useState} from "react";
import { Routes, Route, Switch, Link } from 'react-router-dom';



import socket from './Socket';
import Panel from './Panel';
import Shield from './ShieldMockup'
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Signup from "./components/signup.component";
import Login from "./components/login.component";
import ActivateAccount from "./components/accountActivation.component";
import Footer from "./components/footer.component";
import EventCalendar from "./components/eventCalendar.component"
import QueryAccess from "./components/queryAccess.component"
import GiveAccess from "./components/giveAccess.component"
import EventDashboard from "./components/eventDashboard.component"
import CreateEventForm from "./components/createEventForm.component";
import EditEventForm from "./components/editEventForm.component";
import Cart from "./components/cart.component";
import PaymentForm from "./components/paymentForm.component";
import MyOrder from "./components/myOrder.component";
import './styles/global.css';

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [fonctionCActivee, setFonctionCActivee] = useState(0);


  function activerFonctionC(nbItem) {
    setFonctionCActivee(nbItem);
  }

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    const user = JSON.parse(localStorage.getItem('user'))
  
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
    document.body.classList.add('body-class');
    const user = JSON.parse(localStorage.getItem('user'))

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
              <Navbar isLoggedIn={isLoggedIn} fonctionCActivee={fonctionCActivee} logout={logout} />
              <Routes> 
                    <Route path="/" element={<Home />} />
                    <Route path="/panel/*" element={<Panel />} />
                    <Route path="/login" element={ <Login onLogin={handleLogin} />  } />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/shield" element={<Shield />} />
                    <Route path="/event" element={<EventCalendar activerFonctionC={activerFonctionC} />} />
                    <Route path="/activate" element={<ActivateAccount onLogin={handleLogin} />} />
                    <Route path="/event/access" element={<QueryAccess />} />
                    <Route path="/event/access/activate" element={<GiveAccess />} />
                    <Route path="/dashboard/event" element={<EventDashboard />} />
                    <Route path="/dashboard/event/new" element={<CreateEventForm />} />
                    <Route path="/dashboard/event/edit/:id" element={<EditEventForm />} />
                    <Route path="/cart" element={<Cart activerFonctionC={activerFonctionC} />} />
                    <Route path="/payment" element={<PaymentForm />} />
                    <Route path="/my/order" element={<MyOrder />} />
              </Routes>
              <Footer />
          </div>
     
    </div>
  );
}

export default App;



