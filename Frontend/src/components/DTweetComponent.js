import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router';


const divStyle = {
  width: '50%',
  margin: '0 auto',
  marginTop: '200px'
};


export default class DTweetComponent extends React.Component {



  constructor(props){
    super(props);
    this.publishTweets=this.publishTweets.bind(this);
    this.state = {title: '', content: '', redirect: false}
    this.handleChange = this.handleChange.bind(this);
  }



  publishTweets() {
    var that=this;
    axios.post("http://localhost:3000/tweets/", {
      title: this.state.title,
      content: this.state.content
    }).then(function (data) {

      that.setState({redirect:true});

    }).catch(function (err) {
      console.error(err);
    })
  }
  handleChange(event) {
    event.preventDefault();
    var partialObject = new Object();
    partialObject[event.target.name] = event.target.value;
    this.setState(partialObject);
  }


  render(){
    if (this.state.redirect) {
      return <Redirect to='/dashboard'/>;
    }

    return <div >
      <div style={divStyle}>
        <h1>Add Tweets</h1>
        <div>
        <TextField
          floatingLabelText="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
          <br></br>
      <TextField
        floatingLabelText="Enter Content"
        multiLine={true}
        fullWidth={true}
        rows={2}
        rowsMax={7}
        name="content"
        value={this.state.content}
        onChange={this.handleChange}
      />
          <br></br>
          <br></br>
          <br></br>
          <RaisedButton label="Publish Tweet" onClick={this.publishTweets} />
        </div>
      </div>
    </div>
  }



}
