import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TravellerList from './components/TravellerList';
import TravellerDetail from './components/TravellerDetail';
import Alert from './components/Alert';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  render(){
    console.log(this.props);
    const {alert} = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          {
            alert.alertVisibility && <Alert />
          }
          <Route path="/traveller-fe/" exact component={Home} />
          <Route path="/traveller-fe/list/" component={TravellerList} />
          <Route path="/traveller-fe/detail/" component={TravellerDetail} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps,null)(App);
