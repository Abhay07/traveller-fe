import axios from 'axios';
import { urls } from './../constants';

export function getTraveller(id){
	let url = urls.travellerEndpoint;
	if(id){
		url+=`/${id}`
	}
	return axios.get(url);
}

export function addTraveller(body){
	return axios.post(urls.travellerEndpoint,body);
}

export function updateTraveller(id, body){
	return axios.put(`${urls.travellerEndpoint}/${id}`,body);
}

export function deleteTraveller(id){
	return axios.delete(`${urls.travellerEndpoint}/${id}`);
}