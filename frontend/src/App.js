import React, { Component } from 'react';
import NavBar from './components/navbar.component';
import LoginContent from './components/loginContent.component';
import SignupContent from './components/signupContent.component';
import Home from './components/home.component';
import Footer from './components/footer.component';
import EventCalendar from './components/eventCalendar.component';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginBtn: true,
      showRegisterBtn: true,
      showUserProfileIcon: false,
      showLoginContent: false,
      showSignupContent: false,
      showHome: true,
      showEventsContent: false,
    }
  }

  handleLoginClick = () => {
    this.setState({ 
      showLoginContent: true,
      showSignupContent: false,
      showHome: false,
      showEventsContent: false,
    });
  }

  handleEventsClick = () => {
    this.setState({ 
      showEventsContent: true,
      showSignupContent: false,
      showLoginContent: false,
      showHome: false,
    });
  }

  handleSignupClick = () => {
    this.setState({ 
      showSignupContent: true,
      showLoginContent: false,
      showHome: false,
      showEventsContent: false,
    });
  } 

  handleHomeClick = () => {
    this.setState({ 
      showSignupContent: false,
      showLoginContent: false,
      showHome: true,
      showEventsContent: false,
    });
  }

  render() {    
    return (
      <div>
        <NavBar 
          onLoginClick= {this.handleLoginClick} 
          onSignupClick={this.handleSignupClick} 
          onHomeClick={this.handleHomeClick}
          onEventsClick={this.handleEventsClick}
          showLoginContent={this.state.showLoginContent}
          showSignupContent={this.state.showSignupContent}
        />
        <div className='main'>
          { this.state.showLoginContent && <LoginContent /> }
          { this.state.showSignupContent && <SignupContent /> }
          { this.state.showHome && < Home onEventsClick={this.handleEventsClick} /> }
          { this.state.showEventsContent && < EventCalendar /> }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
