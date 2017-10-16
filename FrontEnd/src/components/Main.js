import React from 'react';
import '../styles/App.css'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import TableComponent from '../components/TableComponent'
import ButtonComponent from '../components/ButtonComponent';
import MapComponent from '../components/MapComponent'
const styles = {
  uploadButton: {
    verticalAlign: 'middle'
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
};


class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {dataComponent: true, isDashboardShown: false, isMapShown: false};
  }


  showView = (data) => {
    if(!data)
      return;
    switch(data){

      case "dashboard":
        this.setState({isDashboardShown: true, isMapShown: false});
        break;
      case "map" :
        this.setState({isDashboardShown: false, isMapShown: true});
        break;
    }

  }


  render() {

    return (
      <MuiThemeProvider>
        <div>
          {!this.state.isDashboardShown && !this.state.isMapShown &&
          <ButtonComponent  showView={this.showView}></ButtonComponent>}
          {this.state.isDashboardShown && <TableComponent/>}
          {this.state.isMapShown && <MapComponent isMarkerShown={true}/>}

        </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
