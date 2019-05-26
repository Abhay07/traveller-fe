import React from 'react';
import { connect } from 'react-redux'
import { toggleAlert } from './../../store/actions';
import {styles} from './style.css';

class Alert extends React.Component {
  componentDidMount(){
    setTimeout(()=>{
      console.log('test');
      this.props.toggleAlert();
    },1000)
  }
  render(){
    const {alertMsg, isInfoAlert} = this.props.alert;
    console.log('alert')
    console.log(alertMsg, isInfoAlert)
    return (
      <span className={isInfoAlert ? 'alert info' : 'alert'}>
        {alertMsg}
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert:state.alert
  }
}

const mapDispatchToProps = { toggleAlert }

export default connect(mapStateToProps,mapDispatchToProps)(Alert);
