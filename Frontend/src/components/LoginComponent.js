import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Redirect } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
const divStyle = {
    width: '50%',
    margin: '0 auto',
    marginTop: '200px'
};
import AppBar from 'material-ui/AppBar';
export default class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {email: '', password: '', redirect: false,addUser:false,open:false,message:null}
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);


    }

    handleChange(event) {
        event.preventDefault();
        var partialObject = new Object();
        partialObject[event.target.name] = event.target.value;
        this.setState(partialObject);
    }


  handleRequestClose = () => {
    this.setState({
      open: false,message:null
    });
  };




    loginUser() {
        var that=this;
        axios.post("http://localhost:3000/users/authenticate", {
            email: this.state.email,
            password: this.state.password
        }).then(function (data) {

            localStorage.setItem("token", data.data.token);

            that.setState({redirect:true});

        }).catch(function (err) {

            console.error(err);
          that.setState({message:"Check Credentials",open:true})
        })
    }


    render() {

      var that=this;
        if (this.state.redirect) {
            return <Redirect to='/dashboard'/>;
        }

        if(this.state.addUser){
          return <Redirect to='/signup'/>;
        }

        return (

            <div style={divStyle}>
                <AppBar
                    title="Login Page"

                />
                <TextField

                    floatingLabelText="Email"
                    fullWidth={true}
                    name="email"
                    value={that.state.email}
                    onChange={that.handleChange}

                /><br />
                <TextField

                    floatingLabelText="Password"
                    fullWidth={true}
                    type="password"
                    name="password"
                    value={that.state.password}
                    onChange={that.handleChange}

                />
                <br />
                <RaisedButton label="Login" onClick={this.loginUser}/>
                <RaisedButton label="Add user" onClick={()=>{
                  that.setState({addUser:true});
              }}/>
              <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
            </div>


        );

    }


}


