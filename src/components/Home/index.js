import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { setAlertMsg } from './../../store/actions';
import { addTraveller } from './../../services';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      dob:null,
      phone:'',
      btnDisable:false
    }
  }
  handleInput(key,val){
    this.setState({[key]:val});
  }
  removeError(){
    this.setState({error:''})
  }
  submitDetails(){
    const {btnDisable} = this.state;
    if(btnDisable){
      return;
    }
    const nameRegex = /^[\w]{3,}[\w\s]*$/,emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/, phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    const {setAlertMsg, toggleAlert} = this.props;
    if(!this.state.name.match(nameRegex)){
      this.setState({error:'Invalid Name'})
    }
    else if(!this.state.email.match(emailRegex)){
      this.setState({error:'Invalid Email'})
    }
    else if(!this.state.phone.match(phoneRegex)){
      this.setState({error:'Invalid Phone Number'})
    }
    else if(!this.state.dob || (new Date(this.state.dob.toString())).getTime() > (new Date()).getTime()){
      this.setState({error:'Invalid Birth date'})
    }
    else{
      let {name,email,phone,dob} = this.state;
      let body = {
        name,
        email,
        phone,
        dob
      }
      this.setState({btnDisable:true})
      addTraveller(body)
      .then(()=>{
        setAlertMsg('Traveller added successfully',true);
      })
      .catch((err)=>{
        setAlertMsg((err.errorMessage || 'Something Went Wrong'));
      })
      .finally(()=>{
        this.setState({btnDisable:false})
      })
    }
  }
  render(){
    const {btnDisable, error} = this.state;
    return (
      <div className="formContainer">
          <h2 className="addTravellerHeading"> Add Traveller </h2>
         <div>
          <input type="text" placeholder="Name" onFocus={this.removeError.bind(this)} onChange={e=>this.handleInput.bind(this)('name',e.target.value)} />
         </div>
         <div>
          <input type="text" placeholder="Email" onChange={e=>this.handleInput.bind(this)('email',e.target.value)} onFocus={this.removeError.bind(this)}/>
         </div>
         <div>
          <input type="date" placeholder="Date of Birth" onFocus={this.removeError.bind(this)} onChange={e=>this.handleInput.bind(this)('dob',e.target.value)} />
         </div>
         <div>
          <input type="text" placeholder="Phone Number" onFocus={this.removeError.bind(this)} onChange={e=>this.handleInput.bind(this)('phone',e.target.value)} />
         </div>
         <button onClick={this.submitDetails.bind(this)} className={btnDisable ? 'disable editBtn' : 'editBtn'}>
          { 
            btnDisable ? 'Submitting' : 'Submit'
          }
         </button>
         <div className="errorTxt">{error}</div>
      </div>
    );
  }
}

const mapDispatchToProps = { setAlertMsg }

export default connect(null,mapDispatchToProps)(Home);