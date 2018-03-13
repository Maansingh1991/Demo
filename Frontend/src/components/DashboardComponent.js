import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {Redirect} from 'react-router';
const divStyle = {
  width: '50%',
  margin: '0 auto',
  marginTop: '100px'
};


export default class DashboardComponent extends React.Component {


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.likeTweets = this.likeTweets.bind(this);
    this.loadTweets = this.loadTweets.bind(this);
    this.state = {redirect: false, tweets: [], comments: false, tweetId: null, search: '',addTweet:''}

  }


  handleChange(event) {
    event.preventDefault();
    var partialObject = new Object();
    partialObject[event.target.name] = event.target.value;
    this.setState(partialObject);
    var that = this;

    axios.get("http://localhost:3000/tweets?search=" + this.state.search, {headers: {Authorization: localStorage.getItem("token")}}).then(function (result) {

      that.setState({redirect: true, tweets: result.data});

    }).catch(function (err) {
      console.error(err);
    })
  }

  componentDidMount() {
    debugger;
    this.loadTweets();
  }

  loadTweets() {
    var that = this;
    axios.get("http://localhost:3000/tweets/", {headers: {Authorization: localStorage.getItem("token")}}).then(function (result) {

      that.setState({tweets: result.data});

    }).catch(function (err) {

      if (err.response.status == 401) {
        localStorage.clear();
        location.reload();
      }
      console.error(err);
    })
  }


  likeTweets(data) {
    var that = this;
    axios.put("http://localhost:3000/tweets/like/" + !data.isLiked, {id: data._id}).then(function (result) {


      that.setState({redirect: true});
      that.loadTweets();

    }).catch(function (err) {
      console.error(err);
    })

  }

  render() {
    var that = this;


    if (this.state.comments) {
      var url = "/detail/" + that.state.tweetId;
      return <Redirect to={url}/>;
    }

    if (this.state.addTweet) {

      return <Redirect to='/dtweet'/>;
    }
    return <div>
      <TextField
        style={{"font-size": "35px"}}
        floatingLabelText="Search Tweets"
        fullWidth={true}
        name="search"
        value={that.state.search}
        onChange={that.handleChange}

      /><br />
      <FlatButton label="Add Tweets" onClick={() => {
        that.setState({addTweet:true});
      }}/>

      <br /><br />
      <div style={divStyle}>
        <h2>Tweets</h2>
        {this.state.tweets.map(function (data) {
          return (
            <div>
              <Card style={{background: "rgba(167, 172, 175, 0.32)"}}>
                <CardHeader
                  title={data.title}
                  subtitle={data.userName}
                  actAsExpander={true}
                  showExpandableButton={false}
                />

                <CardText expandable={false}>
                  {data.content}
                </CardText>
                <CardActions>
                  <FlatButton label={data.isLiked ? "liked" : "like"} onClick={() => {
                    that.likeTweets(data)
                  }}/>
                  <FlatButton label="Show Comments" onClick={() => {
                    that.setState({comments: true, tweetId: data._id});
                  }}/>
                </CardActions>
              </Card>
              <br></br>
              <br></br>
              <br></br>
            </div>


          )

        })}

      </div>
    </div>


  }


}
