import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Spinner, Content, Form, Input, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';

import styles from '../../styles/styles_main'

class MeetupScreen extends Component {

	constructor(props) {
	  super(props);
	  let dsMeetups = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2});
		this.state = {
	      meetups:[],
			isGettingData: true
	    };
	    this.meetupList = [];
		
	}

	componentWillMount(){
		//this.getList("r7j4h1KOmOXekp3ZNZ2xXfX7Qgc2");
		this.getList(this.props.state.account.uid);
	}

	componentDidMount() {
	    var that = this;
	    BackHandler.addEventListener('hardwareBackPress', function() {
	    that.props.navigation.goBack();return true;
	   });
	}

	getList(user_uid){
		var that = this;
		//Add data
		firebase.database().ref("/meetups_users/"+user_uid).on('child_added', (snapshot) =>{
			if(snapshot.exists()){
				that.getInfo(snapshot.key);	
			}
		});

		//Remove data
		firebase.database().ref("/meetups_users/"+user_uid).on('child_removed', (snapshot) =>{
			console.log("REMOVED",snapshot.key);
			var indexRemove = this.state.meetups.findIndex((value)=>value.key==snapshot.key);
			console.log("Index from list", indexRemove)
			
			if(indexRemove!=-1){
				var newMeetups = that.state.meetups;
				newMeetups.splice(indexRemove,1)	
				that.setState({
					meetups:newMeetups
				})
			}
			
			//that.state.meetups.filter( (item, index) => indexRemove !== index)
			//console.log("REMOVED",that.state.meetups)
		
		});
	}

	getInfo(meetup_key){
		var that = this;
		firebase.database().ref("/meetups/"+meetup_key).on('child_added', (dataSnap) =>{
			if(dataSnap.key=="data"){
				var event_name = dataSnap.child("event_name").val();
				var event_location = dataSnap.child("event_location").val();
				var event_address = dataSnap.child("event_address").val();
				var event_date = dataSnap.child("event_date").val();
				var event_time = dataSnap.child("event_time").val();
				var longitude = dataSnap.child("longitude").val();
				var latitude = dataSnap.child("latitude").val();
				this.meetupList.push({
					key: meetup_key,
					event_name:event_name,
					event_location:event_location,
					event_address:event_address,
					event_date:event_date,
					event_time:event_time,
					longitude:longitude,	
					latitude:latitude,	

				})

				that.setState({
				  	meetups:this.meetupList,
					isGettingData:false
				})
				console.log(that.state.meetups);
				//default lang para mag render row
				// this.setState({
				// 	meetupDataSource: this.state.meetupDataSource.cloneWithRows([{key:1}])
				// })
			}
		});

		firebase.database().ref("/meetups/"+meetup_key).on('child_changed', (snapshot) =>{
			console.log("UPDATED",meetup_key)
			if(snapshot.key=="data"){
				var event_name = snapshot.child("event_name").val();
				var event_location = snapshot.child("event_location").val();
				var event_address = snapshot.child("event_address").val();
				var event_date = snapshot.child("event_date").val();
				var event_time = snapshot.child("event_time").val();
				var longitude = snapshot.child("longitude").val();
				var latitude = snapshot.child("latitude").val();
				
				let meetups = [...this.state.meetups];
				//search for record index
				var indexUpdate = this.state.meetups.findIndex((value)=>value.key==meetup_key);
				console.log(indexUpdate);
				//updatedValue
				meetups[indexUpdate].event_name = event_name;
				meetups[indexUpdate].event_location = event_location;
				meetups[indexUpdate].event_address = event_address;
				meetups[indexUpdate].event_date = event_date;
				meetups[indexUpdate].event_time = event_time;
				meetups[indexUpdate].longitude = longitude;
				meetups[indexUpdate].latitude = latitude;

				console.log("DAFAQ", meetups[indexUpdate].event_name)
				this.setState(prevState=>{
					meetups:{
						meetups
					}
				})	
				console.log(this.state.meetups)
				// this.setState({
				// 	meetupDataSource: this.state.meetupDataSource.cloneWithRows([{key:1}])
				// })
			}
		});

		firebase.database().ref("/meetups/"+meetup_key).on('child_removed', (snapshot) =>{
			console.log("REMOVED",meetup_key);
			var indexRemove = this.state.meetups.findIndex((value)=>value.key==meetup_key);
			console.log("Index removed from list", indexRemove)
		
			if(indexRemove!=-1){
				var newMeetups = that.state.meetups;
				newMeetups.splice(indexRemove,1)	
				that.setState({
					meetups:newMeetups
				})
				//that.state.meetups.filter( (item, index) => indexRemove !== index)
				console.log("DATA AFTER REMOVED",that.state.meetups)
			}
		});
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
		          <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
		            <Title>Meetup List</Title>
		          </Body>
		          <Right style={{flex:1}}/>
		        </Header>

	      		<Content style={{flex:1,zIndex:2}}>
	      			{this.state.isGettingData ? <Spinner color='#000'/>:null}
	      			
	      			<FlatList
	      				extraData={this.state}
	      				data={this.state.meetups}
	      				renderItem={({item,index})=>{
	      					return(
	      						<TouchableOpacity 
									key={index}
									onPress={()=>this.props.navigation.navigate("MeetupMap", {info:item})}
									//onPress={()=>alert(JSON.stringify(item))}
									style={{backgroundColor:'white', marginBottom:5}}>
									<CardItem style={{marginBottom:5, flexWrap:"wrap"}}>
								        <View style={{flexDirection:'row'}}>
									        <View style={{flexDirection:'column', width:"100%",flexWrap:"wrap", marginRight:50, marginLeft: 15}}>
										        <Text style={styles.meetupTitle}>{item.event_name}</Text>
										        <Text style={{fontWeight:'bold'}}>{item.event_location}</Text>
										        <Text numberOfLines={1}>{item.event_address}</Text>
										        <Text>{moment(item.event_date).format('LL')} ({item.event_time})</Text>
									      	</View>
								      	</View>
								     </CardItem>
								</TouchableOpacity>
	      					);
	      				}}
			      	/>
			      	
	      		</Content>

	      		<Fab
		            	active={this.state.active}
		            	style={[styles.primaryColor,{zIndex:100}]}
		            	position="bottomRight"
		            	onPress={() => this.props.navigation.navigate('AddMeetup')}>
		            	<Icon name="add" />
		          	</Fab>


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