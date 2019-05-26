import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser, setAlertMsg } from './../../store/actions';
import './style.css';
import { updateTraveller } from './../../services';

class TravellerDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			editable:{
				name:false,
				dob:false,
				phone:false,
				email:false
			},
			user:null
		}
		this.setEditable = this.setEditable.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.updateUserDetails = this.updateUserDetails.bind(this);
	}
	setEditable(val){
		this.setState({
			editable:{...this.state.editable,[val]:true}
		});
	}
	handleInput(key,value){
		this.setState({
			user:{...this.state.user,[key]:value}
		})
	}
	updateUserDetails(){
		const localUser = this.state.user;
		if(!localUser){
			return;
		}
		const {setAlertMsg,user, setCurrentUser} = this.props;
		let body = Object.assign({},localUser);
		updateTraveller(user._id,body)
		.then(_=>{
			setAlertMsg('Traveller details updated successfully',true);
			this.setState({editable:{
				name:false,
				dob:false,
				phone:false,
				email:false
			}})
			setCurrentUser({...user,...localUser});
		})
		.catch(err=>{
			setAlertMsg(err.errorMessage || "Couldn't update details");
		})
	}
	render(){
	  const { user } = this.props;
	  const {editable} = this.state;
	  const date = user && user.dob && (new Date(user.dob.toString())).toLocaleDateString();
	  return (
	  user &&		<div>
		  				<h1 className="addTravellerHeading">Traveller Detail Page</h1>
				  		<div className="userDetails">
					    <span onClick={e=>this.setEditable('name')}>
					    	{ !editable.name && user.name}
					    	{ editable.name && <input type="text" placeholder="Name" onBlur={e=>this.handleInput('name',e.target.value)}/>}
					    </span>
					    <span onClick={e=>this.setEditable('email')} >
					    	{ !editable.email && user.email}
					    	{ editable.email && <input type="text" placeholder="Email" onBlur={e=>this.handleInput('email',e.target.value)}/>}
					    </span>
					    <span onClick={e=>this.setEditable('date')}>
							{ !editable.date && date}
					    	{ editable.date && <input type="date" placeholder="Date of birth" onChange={e=>this.handleInput('dob',e.target.value)}/>}
					    </span>
					    <span onClick={e=>this.setEditable('phone')}>
							{ !editable.phone && user.phone}
					    	{ editable.phone && <input type="text" placeholder="Phone number" onBlur={e=>this.handleInput('phone',e.target.value)}/>}
					    </span>
					    <span>
					    <button className="editBtn" onClick={this.updateUserDetails}>Save</button>
					    </span>
					    </div>
				    </div>
	  );
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user 
  }
}

const mapDispatchToProps = { setCurrentUser, setAlertMsg }

export default connect(mapStateToProps,mapDispatchToProps)(TravellerDetail);
