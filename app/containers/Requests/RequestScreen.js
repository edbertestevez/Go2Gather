import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions, Alert} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Content, Form, Input, Item, Label, Spinner, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import * as constants from '../../constants'

import styles from '../../styles/styles_main'

class MeetupScreen extends Component {

	constructor(props) {
	  super(props);
	 	let dsRequests = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2});
		this.state = {
	      requestsDataSource: dsRequests,
	      requests:[],
	      isGettingData: true
	    };
	    this.renderRow = this.renderRow.bind(this);
	    this.requestList = [];
	}

	componentWillMount(){
		// this.getRequestsList(this.props.state.account.uid);
		this.getRequestsList("6qtCXPySzpN0LYg79kc0Ex4046m1");
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();return true;
		});
	}

	getRequestsList(id){
		var that = this;

		firebase.database().ref("/requests/"+id).on("child_added",(snapshot)=>{
			//get meetup data
			var meetup_key = snapshot.child("meetup_id").val();
			var requestor_id = snapshot.child("requestor").val();
			var requestor_name = '';
			var requestor_photo = '';
			var request_key = snapshot.key;
			console.log(meetup_key);
			firebase.database().ref("/users/"+requestor_id).on("value",(dataSnap)=>{
				requestor_name = dataSnap.child("name").val();
				requestor_photo = dataSnap.child("photo").val();
			})
			firebase.database().ref("/meetups/"+meetup_key).on("child_added",(dataSnap)=>{
				if(dataSnap.key=="data"){
					var event_name = dataSnap.child("event_name").val();
					var event_location = dataSnap.child("event_location").val();
					var event_address = dataSnap.child("event_address").val();
					var event_date = dataSnap.child("event_date").val();
					var event_time = dataSnap.child("event_time").val();
					var longitude = dataSnap.child("longitude").val();
					var latitude = dataSnap.child("latitude").val();
					this.requestList.push({
						request_key: request_key,
						meetup_key: meetup_key,
						event_name:event_name,
						event_location:event_location,
						event_address:event_address,
						event_date:event_date,
						event_time:event_time,
						longitude:longitude,	
						latitude:latitude,	
						requestor_name:requestor_name,
						requestor_photo:requestor_photo,
						requestor_id:requestor_id
					})

					that.setState({
					  	requests:this.requestList,
					  	isGettingData:false
					})
					console.log(that.state.requests);
					//default lang para mag render row
					this.setState({
						requestsDataSource: this.state.requestsDataSource.cloneWithRows([{key:1}])
					})
				}
			});
		});

		firebase.database().ref("/requests/"+id).on("child_removed",(snapshot)=>{
			var indexRemove = this.state.requests.findIndex((value)=>value.request_key==snapshot.key);
			
			if(indexRemove!=-1){
				var newRequests = that.state.requests;
				newRequests.splice(indexRemove,1)	
				that.setState({
					requests:newRequests
				})
			}
		});
	}

	acceptRequest(request_key,meetup_key){
		var that = this;
		firebase.database().ref("/requests/6qtCXPySzpN0LYg79kc0Ex4046m1/"+request_key).remove().then(
			firebase.database().ref("/meetups_users/6qtCXPySzpN0LYg79kc0Ex4046m1/"+meetup_key).set({status:"active"})
			.then(ToastAndroid.show(constants.REQUEST_ACCEPT_SUCCESS, ToastAndroid.SHORT))
		);
	}

	deleteRequest(key){
		var that = this;
		//console.log(key);
		firebase.database().ref("/requests/6qtCXPySzpN0LYg79kc0Ex4046m1/"+key).remove()
		.then(ToastAndroid.show(constants.REQUEST_DECLINE_SUCCESS, ToastAndroid.SHORT));
		//firebase.database().ref("/requests/"+that.props.state.account.uid+"/"+key).remove();
	}

	confirmAccept(meetup_name, request_key,meetup_key){
		Alert.alert(
			  'Accept Request',
			  "("+meetup_name+')\n\nAre you sure you want to accept this meetup request?',
			  [
			    {text: 'Cancel',  style: 'cancel'},
			    {text: 'Yes', onPress: ()=>{this.acceptRequest(request_key,meetup_key)}},
			  ],
			  { cancelable: false }
			)
	}

	confirmDelete(meetup_name, key){
		Alert.alert(
			  'Decline Request',
			  "("+meetup_name+')\n\nAre you sure you want to decline this meetup request?',
			  [
			    {text: 'Cancel',  style: 'cancel'},
			    {text: 'Yes', onPress: ()=>{this.deleteRequest(key)}},
			  ],
			  { cancelable: false }
			)
	}

	renderRow(item){
		const { navigate } = this.props.navigation;
		var that = this;
		var returnValue = null;
		{that.state.requests?
			returnValue = that.state.requests.map((record,index)=>{
			var event_date = moment(record.event_date).format('LL')+" ("+record.event_time+")";
			return(
			
				<CardItem key={index} style={{marginBottom:5}}>
					<View style={{flexDirection:'column', marginTop:5}}>
				        <View style={{flexDirection:'row', marginRight:10, marginLeft: 5}}>
					        <View>
					        	<Image 
					        		style={{width: 100, height:100, borderRadius:50, marginTop:3, marginLeft:15}}
					        		source={{uri: record.requestor_photo}}
					        	/>
					        </View>
					        <View style={{flexDirection:'column', width:230, marginLeft:20, paddingRight:35}}>
						        <Text style={styles.meetupTitle}>{record.event_name}</Text>
						        <Text style={{fontWeight:'bold'}}>{record.event_location}</Text>
						        <Text>{record.event_address}</Text>
						        <Text style={{marginBottom:8}}>{event_date}</Text>
						        <Text>By: {record.requestor_name}</Text>
					        </View>
				      	</View>
				      	<View style={{flexDirection:'row', marginTop:20, marginBottom:15, justifyContent:'center'}}>
					      	<Button 
					      		iconLeft transparent bordered rounded success 
					      		style={{margin:5, paddingLeft:25, paddingRight:40}}
					      		onPress={()=>this.confirmAccept(record.event_name,record.request_key,record.meetup_key)}> 
					      		<Icon name='check' style={{marginRight:8}} size={20}/>
					      		<Text>Accept</Text>
					      	</Button>
					      	<Button 
					      		iconLeft transparent bordered rounded danger 
					      		style={{margin:5, paddingLeft:25, paddingRight:30}}
					      		onPress={()=>this.confirmDelete(record.event_name,record.request_key)}> 
					      		<Icon name='close' style={{marginRight:8}} size={20}/>
					      		<Text>Decline</Text>
					      	</Button>
					      	
				      	</View>
			      	</View>
			     </CardItem>
		)}): returnValue=null}
		return returnValue;
	}

	
	render(){
		return(
			<Container>
				<Header style={[{shadowOpacity: 0,elevation:0, zIndex:10}, styles.header]}>
		          <Left style={{ flex: 1 }}>
		            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
		              <Icon name='menu' size={24} style={{color:'white'}} />
		            </Button>
		          </Left>
		          <Body style={{ flex: 5,  justifyContent: 'center', alignItems: 'center' }}>
		            <Title>Meetup Requests</Title>
		          </Body>
		          <Right style={{flex:1}}/>
		        </Header>

	      		<Content style={{flex:1,zIndex:2}}>
	      			{this.state.isGettingData ? <Spinner color='#000'/>:null}
	      			<ListView
	      				style={{zIndex:10}}
			      		dataSource={this.state.requestsDataSource}
			      		renderRow={this.renderRow}
			      	/>
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

export default connect(mapStateToProps,mapDispatchToProps)(MeetupScreen);