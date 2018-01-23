import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
//FIREBASE
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Header, Content, Form, Input, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import styles from '../../styles/styles_main'
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as constants from '../../constants'

class AddMeetupScreen extends Component {

	/*NO REDUX FOR NOW*/
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	event_name:'',
	  	event_date: '',
	  	event_time: '',
	  	event_address:'',
	  	event_location: '',
	  	longitude: 0,
	  	latitude: 0,
	  };
	  
	}

	componentWillMount(){
		console.log("ADD MEETUP NA KO", this.props.state.nav)
	}

    addRecord(user_uid){
    	//meetup record
    	let new_key = firebase.database().ref("/meetups_users/"+user_uid).push().getKey();

    	firebase.database().ref("/meetups_users/"+user_uid+"/"+new_key).set({
    		status: "active"
    	})
    	.then(
		firebase.database().ref("/meetups/"+new_key+"/data").set({
            event_name: this.state.event_name,
			event_date: this.state.event_date,
			event_time: this.state.event_time,

			event_address: this.props.state.location.searchAddPlace.address,
			event_location: this.props.state.location.searchAddPlace.place,
			longitude: this.props.state.location.searchAddPlace.longitude,
			latitude: this.props.state.location.searchAddPlace.latitude,
			creator: user_uid 
        })
        )
        .then(
        	firebase.database().ref("/meetups/"+new_key+"/users/"+user_uid).set({
            	status: "active"
        	})
        	.then(ToastAndroid.show(constants.ADD_MEETUP_SUCCESS, ToastAndroid.SHORT))
        )
        
    }

	render(){
		return(
			<Container>
				<Content padder>
					<Form>
		            	<Item style={{width:'90%',height:50}}>
			              	<Left style={styles.formCustIcon}>
			              	<Icon name="nature-people" style={{position:'absolute',left:0}} size={25}/>
			              	</Left>
			              	<Input style={{textAlign:'center',position:'absolute',width:'100%',fontSize:16}} selectTextOnFocus={true} placeholder="Event Name" onChangeText={(event_name)=>this.setState({event_name})}>{this.state.event_name}</Input>
		            	</Item>

		            	<DatePicker
					        style={{flex:1,width: '90%', height: 45, marginTop:20, borderBottomWidth:1,borderBottomColor:"#cacaca",marginLeft:15,
					            }}
					        date={this.state.event_date}
					        mode="date"
					        placeholder="Select Date"
					        format="YYYY-MM-DD"
					        maxDate="2018-06-01"
					        confirmBtnText="Confirm"
					        cancelBtnText="Cancel"
					        customStyles={{
					          dateIcon: {
					            position: 'absolute',
					            left: 0,
					            top: 4,
					            marginLeft: 0,
					            width:28,
								height:28
					            
					          },
					          dateInput: {
					            borderWidth:0,
					          },
					          placeholderText: {
			                      fontSize: 16,
			                      color: '#000',
			                  },
			                  dateText:{
			                  	justifyContent: 'flex-start',
			                  }
					          // ... You can check the source to find the other keys.
					        }}
					        onDateChange={(event_date) => {this.setState({event_date: event_date})}}
					      />

		            	<DatePicker
					        style={{flex:1,width: '90%',height: 45, marginTop:20,  borderBottomWidth:1,borderBottomColor:"#cacaca",marginLeft:15,
					            }}
					        date={this.state.event_time}
					        mode="time"
					        placeholder="Select Time"
					        format="h:mm A"
					        confirmBtnText="Confirm"
					        cancelBtnText="Cancel"
					        is24Hour={false}
					        customStyles={{
					          dateIcon: {
					            position: 'absolute',
					            left: 0,
					            top: 4,
					            marginLeft: 0,
					            width:28,
								height:28					            
					          },
					          dateInput: {
					            borderWidth:0,
					          },
					          placeholderText: {
			                      fontSize: 16,
			                      color: '#000',
			                  },
			                  dateText:{
			                  	justifyContent: 'flex-start',
			                  }
					          // ... You can check the source to find the other keys.
					        }}
					        onDateChange={(event_time) => {this.setState({event_time: event_time})}}
					      />
		          

					    <Item style={{width:'90%',height: 45, marginTop:20}}>
			              	<Left style={styles.formCustIcon}>
			              	<Icon name="add-location" style={{position:'absolute',left:0}} size={25}/>
			              	</Left>
			              	<TouchableOpacity 
			            	onPress={()=>this.props.actions.searchGooglePlaceMeetup(this.props.state.location)}
			            	style={{width:'100%',height:60, borderBottomWidth:1, borderBottomColor:'#cacaca',marginLeft:0,justifyContent:'center',alignItems:'center'}}>
				           		{this.props.state.location.searchAddPlace.place?
				           			<Text style={{fontSize:16}}>{this.props.state.location.searchAddPlace.place}</Text>
				           			:<Text style={{fontSize:16}}>Meetup Place</Text>}
			            	</TouchableOpacity>
		            	</Item>

		            	

		            	
		            	{/*}
		            	<Item >
		              	<Label>Address</Label>
		              	<Input editable={false} selectTextOnFocus={true} onChangeText={(event_address)=>this.setState({event_address})} >
		              		{this.props.state.location.searchAddPlace.address?this.props.state.location.searchAddPlace.address:"N/A"}
		              	</Input>
		            	</Item>

		            	<Item >
		              	<Label>Longitude</Label>
		              	<Input editable={false} selectTextOnFocus={true} onChangeText={(longitude)=>this.setState({longitude})} >
		              		{this.props.state.location.searchAddPlace.longitude?this.props.state.location.searchAddPlace.longitude:"N/A"}
		              	</Input>
		            	</Item>

		            	<Item >
		              	<Label>Latitude</Label>
		              	<Input editable={false} selectTextOnFocus={true} onChangeText={(latitude)=>this.setState({latitude})} >
		              		{this.props.state.location.searchAddPlace.latitude?this.props.state.location.searchAddPlace.latitude:"N/A"}
		              	</Input>
		            	</Item>
		            	{*/}

		            	<Button full success style={{marginTop: 25,marginLeft:15, marginRight:25}} onPress={()=>this.addRecord(this.props.state.account.uid)}>
				        	<Text style={{color:'white'}}>Save Record</Text>
				        </Button>
		          	</Form>	
				</Content>

			</Container>			

		)
	}
}

//PROPS
const mapStateToProps = state => ({
  state: state
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(AddMeetupScreen);