import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import {Redirect} from 'react-router';
const divStyle = {
  width: '25%',
  margin: '0 auto',
  marginTop: '100px'
};


export default class SignUpComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.state = {email: null, password: null, city: null, state: null, firstName: null, lastName: null, open: false,message:null}
  }

  handleChange(event) {
    event.preventDefault();
    var partialObject = new Object();
    partialObject[event.target.name] = event.target.value;
    this.setState(partialObject);
  }


  addUser() {

    var that = this;
    axios.post("http://localhost:3000/users", {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      state: this.state.state
    }).then(function (data) {
      debugger;
      that.setState({redirect: true});

    }).catch(function (err) {
      that.setState({message:err.response.data,open:true})
    })

  }

  handleRequestClose = () => {
    this.setState({
      open: false,message:null
    });
  };


  render() {


    if(this.state.redirect){
      return <Redirect to='/'/>;

    }

    return <div>
      <div style={divStyle}>


        <TextField

          hintText="Email"
          fullWidth={false}
          name="email"
          value={this.state.email}
          onChange={this.handleChange}

        /><br />
        <TextField

          hintText="Password"
          fullWidth={false}
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}

        />

        <br />
        <TextField

          hintText="First Name"
          fullWidth={false}

          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}

        />

        <br />
        <TextField

          hintText="Last Name"
          fullWidth={false}

          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}

        />
        <br />
        <TextField

          hintText="City"
          fullWidth={false}

          name="city"
          value={this.state.city}
          onChange={this.handleChange}

        />
        <br />
        <TextField

          hintText="State"
          fullWidth={false}

          name="state"
          value={this.state.state}
          onChange={this.handleChange}

        />
        <br />
        <br />
        <br />
        <RaisedButton label="submit" onClick={this.addUser}/>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    </div>
  }

}
