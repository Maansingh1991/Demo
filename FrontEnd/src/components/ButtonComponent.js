import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FlatButton from 'material-ui/FlatButton';

export default class ButtonComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  enableDashboardComponent = () => {
    this.props.showView("dashboard");
  }

  enableMapComponent = () => {
    this.props.showView("map");
  }

  render() {
    return (<div className="buttons-container">


      <FlatButton
        label="DashBoard for data table"
        labelPosition="before"
        primary={true}
        onClick={ this.enableDashboardComponent}
        icon={<ActionAndroid />
        }
      />
      <FlatButton
        target="_blank"
        label="Map to show location"
        secondary={true}
        onClick={ this.enableMapComponent}
        icon={<FontIcon className="muidocs-icon-custom-github"/>}
      />

    </div>)
  }


}
