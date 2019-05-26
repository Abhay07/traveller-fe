import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { setUserList, setCurrentUser, setAlertMsg } from './../../store/actions';
import { BrowserRouter as Route, Link } from "react-router-dom";
import { getTraveller, deleteTraveller } from './../../services';

class TravellerList extends React.Component {
	componentDidMount(){
		const {setUserList, setAlertMsg} = this.props;
		getTraveller()
		.then(res=>{
			setUserList(res.data);
		})
		.catch(err=>{
			setAlertMsg(err.errorMessage || "Couldn't fetch travellers list");
		})
	}
	deleteTraveller(e,id){
		e.preventDefault();
		e.stopPropagation();
		const {setAlertMsg, usersList, setUserList} = this.props;
		deleteTraveller(id)
		.then(_=>{
			setAlertMsg('Traveller Deleted successfully',true)
			let updatedList = usersList.filter(user=>user._id !== id);
			setUserList(updatedList);
		})
		.catch(err=>{
			setAlertMsg("Couldn't delete Traveller");
		})
	}
	render(){
	  const {usersList, setCurrentUser} = this.props;
	  console.log(usersList);
	  return (
	    <div>
	    	<h1 className="addTravellerHeading">Traveller List Page</h1>
	       { usersList && 
	       	 usersList.map((n) => 
	       	 	<div>
	       	 		<Link to={'/traveller-fe/detail/'+n._id} onClick={e=>setCurrentUser(n)} className="userDetails">
	       	 			<span>{n.name}</span>
	       	 			<span>
	       	 				<span className="editBtn" onClick={e=> this.deleteTraveller.bind(this)(e,n._id)}>Delete</span>
	       	 			</span>
	       	 		 </Link>
	       	 	</div>)
	       }
	       {
	       	usersList.length == 0 && 
	       	<div className="userDetails">
	       		No Traveller found
	       	</div>
	       }
	    </div>
	  );
	}
}

const mapStateToProps = (state) => {
  return {
    usersList: state.usersList.list
  }
}

const mapDispatchToProps = { setUserList, setCurrentUser, setAlertMsg }

export default connect(mapStateToProps,mapDispatchToProps)(TravellerList);
