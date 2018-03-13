import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

const divStyle = {
  width: '50%',
  margin: '0 auto',
  marginTop: '200px'
};

export default class DTweetDetailComponent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {tweets: null, comment: ''};
  }

  handleChange = (event) => {
    event.preventDefault();
    var partialObject = new Object();
    partialObject[event.target.name] = event.target.value;
    this.setState(partialObject);
  }

  componentDidMount() {
    var that = this;
    var id = location.pathname.split('/detail/')[1];

    axios.get("http://localhost:3000/tweets?id=" + id).then(function (response) {

      that.setState({tweets: response.data});

    }).catch(function (err) {
      console.error(err);
    })
  }


  addComment = (event) => {
    if(!this.state.comment){
      return;
    }
    var id = location.pathname.split('/detail/')[1];
    axios.put("http://localhost:3000/tweets/comments",{id:id,comment:this.state.comment}).then(function (response) {

      that.setState({tweets: response.data});

    }).catch(function (err) {
      console.error(err);
    })

  }


  render() {

    return <div>

      <div style={divStyle}>

        <h2>Tweet</h2>
        <Card style={{background: "rgba(167, 172, 175, 0.32)"}}>
          <CardHeader
            title={this.state.tweets ? this.state.tweets.title : "Title"}
            subtitle={this.state.tweets ? this.state.tweets.userName : "Name"}
            actAsExpander={true}
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            {this.state.tweets ? this.state.tweets.content : "Content"}
          </CardText>
        </Card>

        <TextField

          floatingLabelText="Comments"
          fullWidth={true}
          type="comment"
          name="comment"
          value={this.state.comment}
          onChange={this.handleChange}


        />
        <FlatButton label="Add Comment" onClick={this.addComment}/>
      </div>


      <div style={{
        width: '50%',
        margin: '0 auto',
        marginTop: '100px'
      }}>


        Comments



        {this.state.tweets?this.state.tweets.comments.map(function(data){
          return (<div><Card>
            <CardHeader
              title={data ? data.date : "Date"}
              subtitle={data ? data.userName : "Date"}
              actAsExpander={true}
              showExpandableButton={false}
            />
            <CardText expandable={false}>
              {data ? data.comment : "Content"}
            </CardText>
          </Card><br></br></div>);
        }):"No Comments"}
      </div>


    </div>


  }


}
