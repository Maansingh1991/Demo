require('normalize.css/normalize.css');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginComponent from '../components/LoginComponent';
import DTweetComponent from '../components/DTweetComponent';
import DashboardComponent from '../components/DashboardComponent';
import DTweetDetailComponent from '../components/DTweetDetailComponent';
import SignUpComponent from '../components/SignUpComponent';
import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

import {
  BrowserRouter as Router,
  Route, Switch

} from 'react-router-dom'

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  validate() {

    if (localStorage.getItem("token")) {

      return true;
    } else {

      return false;
    }

  }


  render() {
    var that=this;
    return (
      <MuiThemeProvider>

        <Router>
          <Switch>
            <Route exact path="/" render={function() {
              if(that.validate()){
                return <DashboardComponent />
              }else{
                return <LoginComponent/>
              }

            }}/>
            <Route path="/dtweet" render={() => (
              this.validate() ? (
                <DTweetComponent />
              ) : (
                <Redirect to='/'/>

              )
            )}/>
            <Route path="/dashboard" render={() => (
              this.validate() ? (
                <DashboardComponent />
              ) : (
                <Redirect to='/'/>

              )
            )}/>
            <Route path="/detail/:id" render={() => (
              this.validate() ? (
                <DTweetDetailComponent />
              ) : (
                <Redirect to='/'/>

              )
            )}/>

            <Route path="/signup" render={function() {
              if(that.validate()){
                return <DashboardComponent />
              }else{
                return <SignUpComponent/>
              }

            }}/>


          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
