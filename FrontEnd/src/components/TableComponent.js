import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import axios from 'axios';
import TextField from 'material-ui/TextField';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class TableExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
    this.state = {
      data: [], tweet_created_at: null,
      text: null,
      source: null,
      user_name: null,
      user_screen_name: null,
      user_location: null,
      place: null,
      coordinates: null,
      created_at: null,
      updated_at: null
    };
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall=(query)=>{
    var that=this;
    var queryString=query?'/'+query:''
    axios.get('http://localhost:3000/feeds'+queryString)
      .then(function (response) {

        that.setState({data: response.data})

      })
      .catch(function (error) {
        console.error(error)
      });
  }


  renderTableData(data) {

    if (!data) {
      return;
    }
    var obj = data.map((val) => {

      return (<TableRow>
        <TableRowColumn>{val.user_name}</TableRowColumn>
        <TableRowColumn>{val.user_screen_name}</TableRowColumn>
        <TableRowColumn style={{wordWrap: 'intial', whiteSpace: 'normal'}}>{val.tweet_created_at}</TableRowColumn>
        <TableRowColumn style={{wordWrap: 'intial', whiteSpace: 'normal'}}>{val.text}</TableRowColumn>
        <TableRowColumn style={{wordWrap: 'intial', whiteSpace: 'normal'}}>{val.source}</TableRowColumn>
        <TableRowColumn style={{wordWrap: 'intial', whiteSpace: 'normal'}}>{val.place?JSON.stringify(val.place):"No Details"}</TableRowColumn>

      </TableRow>)
    });
    return obj;
  }


  render() {


    return (<div>
      <TextField onChange={(event,data)=>{this.apiCall(data)}}
        hintText="The hint it will wrap."
      /><br />

      <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>User Name</TableHeaderColumn>
          <TableHeaderColumn>User Screen Name</TableHeaderColumn>
          <TableHeaderColumn>Tweet Created At</TableHeaderColumn>
          <TableHeaderColumn>Text</TableHeaderColumn>
          <TableHeaderColumn>Source</TableHeaderColumn>
          <TableHeaderColumn>Place</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>

        {this.state.data && this.renderTableData(this.state.data)}

      </TableBody>
    </Table>
    </div>);

  }


}


export default TableExampleSimple;
