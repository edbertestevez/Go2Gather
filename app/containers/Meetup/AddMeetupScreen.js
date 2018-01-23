import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from "react-native";
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Header, Content, Form, Input, Spinner, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import styles from '../../styles/styles_main'
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as constants from '../../constants'
import MultiSelect from 'react-native-multiple-select';
class AddMeetupScreen extends Component {

	/*NO REDUX FOR NOW*/
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isCreating: false,
	  };
	  
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.navigate("Meetup");
		    return true;
		});
	}

	componentWillMount(){
		console.log("ADD MEETUP NA KO", this.props.state.nav)
	}

    createMeetup(user_uid){
    	var that = this;

    	if(that.props.state.meetups.event_name == "" ||
    		that.props.state.meetups.event_data == "" ||
    		that.props.state.meetups.event_time == "" ||
    		that.props.state.meetups.newMeetupLocation.address == "" ||
    		that.props.state.meetups.newMeetupLocation.place == "" ||
    		that.props.state.meetups.newMeetupLocation.longitude == 0 ||
    		that.props.state.meetups.newMeetupLocation.latitude == 0 
    	){
    		ToastAndroid.show(constants.INCOMPLETE_FORM, ToastAndroid.SHORT);
    	}else if(that.props.state.meetups.selectedMeetupFriends.length>0){
	    	this.setState({isCreating:true})
	    	let new_key = firebase.database().ref("/meetups_users/"+user_uid).push().getKey();

	    	firebase.database().ref("/meetups_users/"+user_uid+"/"+new_key).set({
	    		status: "active"
	    	})
	    	.then(
			firebase.database().ref("/meetups/"+new_key+"/data").set({
	            event_name: that.props.state.meetups.event_name,
				event_date: that.props.state.meetups.event_date,
				event_time: that.props.state.meetups.event_time,

				event_address: that.props.state.meetups.newMeetupLocation.address,
				event_location: that.props.state.meetups.newMeetupLocation.place,
				longitude: that.props.state.meetups.newMeetupLocation.longitude,
				latitude: that.props.state.meetups.newMeetupLocation.latitude,
				creator: user_uid 
	        })
	        )
	        .then(
	        	firebase.database().ref("/meetups/"+new_key+"/users/"+user_uid).set({
	            	status: "active"
	        	})
	        	.then(
	        		that.props.state.meetups.selectedMeetupFriends.map((record,index)=>{
	        			let request_key = firebase.database().ref("/requests/"+record.value).push().getKey();
	        			firebase.database().ref("/requests/"+record.value+"/"+request_key).set({
	        				meetup_id: new_key,
	        				requestor: user_uid
	        			})
	        		})
	        	)
	        	.then(
	        		// CLEAR ALL SA MEETUP STATE 
	        		setTimeout(()=>{
	        			that.props.actions.clearMeetupForm(),
	        			ToastAndroid.show(constants.ADD_MEETUP_SUCCESS, ToastAndroid.SHORT),
		    			that.setState({isCreating:false}),
		    			that.props.navigation.navigate("Meetup")
		    		}, 2000)
	        	)
	        )
    	}else{
    		ToastAndroid.show(constants.INCOMPLETE_FRIEND, ToastAndroid.SHORT);
    	}
        
    }


    removeUser(indexRemove){
    	var that = this;
    	var newArray = that.props.state.meetups.selectedMeetupFriends;
    	newArray.splice(indexRemove,1);
    	that.props.actions.updateFriendMeetups(newArray)
    }

	render(){
		return(
			<Container>
				<Content padder style={{flex:1}}>
					<Form>
		            	<Item style={{width:'90%',height:50}}>
			              	<Left style={styles.formCustIcon}>
			              	<Icon name="nature-people" style={{position:'absolute',left:0}} size={25}/>
			              	</Left>
			              	<Input style={{textAlign:'center',position:'absolute',width:'100%',fontSize:16}} selectTextOnFocus={true} placeholder="Event Name" 
			              		onChangeText={(event_name)=>this.props.actions.enter_event_name(event_name)}>{this.props.state.meetups.event_name}
			              	</Input>
		            	</Item>

		            	<DatePicker
					        style={{flex:1,width: '90%', height: 45, marginTop:20, borderBottomWidth:1,borderBottomColor:"#cacaca",marginLeft:15,
					            }}
					        date={this.props.state.meetups.event_date}
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
			                      color: '#7f7f7f',
			                  },
			                  dateText:{
			                  	justifyContent: 'flex-start',
			                  }
					          // ... You can check the source to find the other keys.
					        }}
					        onDateChange={(event_date) => {this.props.actions.enter_event_date(event_date)}}
					      />

		            	<DatePicker
					        style={{flex:1,width: '90%',height: 45, marginTop:20,  borderBottomWidth:1,borderBottomColor:"#cacaca",marginLeft:15,
					            }}
					        date={this.props.state.meetups.event_time}
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
			                      color: '#7f7f7f',
			                  },
			                  dateText:{
			                  	justifyContent: 'flex-start',
			                  }
					          // ... You can check the source to find the other keys.
					        }}
					        onDateChange={(event_time) => {this.props.actions.enter_event_time(event_time)}}
					      />
		          

					    <Item style={{width:'90%',height: 45, marginTop:12}}>
			              	<Left style={styles.formCustIcon}>
			              	<Icon name="account-location" style={{position:'absolute',left:0}} size={25}/>
			              	</Left>
			              	<TouchableOpacity 
			            	onPress={()=>this.props.actions.searchGooglePlaceMeetup(this.props.state.location)}
			            	style={{width:'100%',height:60, borderBottomWidth:1, borderBottomColor:'#cacaca',marginLeft:0,justifyContent:'center',alignItems:'center'}}>
				           		{this.props.state.meetups.newMeetupLocation.place?
				           			<Text style={{fontSize:16}}>{this.props.state.meetups.newMeetupLocation.place}</Text>
				           			:<Text style={{fontSize:16}}>Meetup Place</Text>}
			            	</TouchableOpacity>
		            	</Item>

		            	{/*}
		            	<Button full success style={{marginTop: 25,marginLeft:15, marginRight:25}} onPress={()=>this.addRecord(this.props.state.account.uid)}>
				        	<Text style={{color:'white'}}>Save Record</Text>
				        </Button>
				    	*/}
				    	<Item style={{width:'90%',minHeight: 50, flexWrap:"wrap", marginTop:12}}>
				    		<Left style={styles.formCustIcon}>
			              		<Icon name="account-multiple" style={{position:'absolute',left:0}} size={25}/>
			              	</Left>
			              	
			              	{this.props.state.meetups.selectedMeetupFriends.length>0 ?
			              		this.props.state.meetups.selectedMeetupFriends.map((record,index)=>{
						          var val = JSON.stringify(record);
						          return(
						            <Button 
						              rounded bordered key={index} 
						              style={{paddingLeft:12, paddingRight:8, margin:3}}
						              onPress={()=>this.removeUser(index)}>
						              <Text style={{marginRight:6}}>{record.label}</Text>
						              <Icon name='close' style={{color:"#660000"}} size={18}/>
						            </Button>
						          )
						        }):<Text style={{textAlign:'center',position:'absolute',width:'100%',fontSize:16, color:"#7f7f7f"}}>No friends added for meetup</Text>
			              	}
				    	</Item>
				    	
				    	<Button 
				    		iconLeft full rounded 
				    		style={{marginLeft:"4%", marginRight:"6%", marginTop:20, height: 55}}
				    		onPress={()=>this.props.navigation.navigate("MeetupAddFriend")}>
				    		<Icon name='account-multiple-plus' size={27} style={{color:"white", marginRight:20}}/>
				    		<Text style={{color:"white", fontSize:15}}>Add friends for meetup</Text>
				    	</Button>
				    	


				        {this.state.isCreating ? 
				        	<Button 
					    		full iconLeft rounded success 
					    		style={{marginTop: 7, height:55,marginBottom:15,marginLeft:15, marginRight:25}} 
						    >
					        	<Spinner color='#fff' style={{color:"white", marginRight:20}}/>
					        	<Text style={{color:'white', fontSize:15}}>Saving Meetup Record</Text>
					        </Button>
				        	:
				        	<Button 
					    		full iconLeft rounded success 
					    		style={{marginTop: 7, height:55,marginBottom:15,marginLeft:15, marginRight:25}} 
					    		onPress={()=>this.createMeetup(this.props.state.account.uid)}
						    >
					        	<Icon name='check' size={27} style={{color:"white", marginRight:20}}/>
					        	<Text style={{color:'white', fontSize:15}}>Create Meetup Record</Text>
					        </Button>
				        }
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