import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, Alert,ToastAndroid} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
//FIREBASE
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {Container, Header, Spinner, Content, Form, Input, Item, Icon, InputGroup, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import styles from '../../styles/styles_main'
import * as constants from '../../constants'
import SelectMultiple from 'react-native-select-multiple'

class SendMeetupInviteScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	meetupData:[],
	  	searchValue:"",
	  	unlistedFriendsLabel:[],
	  	goingData:[],
	  	selectedFriends:[],
	  	isGettingData:false,
	  };
	  this.allFriends = [];
	  this.unlistedFriends = [];
	}
	
	componentWillMount(){
		var selected = this.props.state.meetups.selectedMeetupFriends;
		this.setState({selectedFriends: selected}); 

		const {state} = this.props.navigation;
		this.setState({meetupData:state.params.info})
		this.setState({goingData:state.params.going})

	{/*FIX THIS ONE BRO*/}
		// this.allFriends = this.props.state.account.friendsLabel;
		// console.log("ALL FRIENDS", this.allFriends);
		// firebase.database().ref("/meetups/"+state.params.info.key+"/users").on("child_added", (snapshot)=>{
		// 	//get ang wala sa record then push to array for label
		// 		var recordLabel = this.allFriends.find((value)=>{
		// 			return value.value != snapshot.key;
		// 		});
		// 		console.log(recordLabel)
			
		// })
	}

	componentDidMount(){
		var that = this;
		BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();
		    return true;
		});
	}

	onSelectionsChange = (selectedUsers) => {
		//console.log(selectedUsers)
		//actions to change props of selected users
		//this.props.actions.updateFriendMeetups(selectedUsers)
	    this.setState({ selectedFriends:selectedUsers })
	}

	sendRequests(){
		var that = this;
		if(that.state.selectedFriends.length > 0){
			that.state.selectedFriends.map((record,index)=>{
	        	let request_key = firebase.database().ref("/requests/"+record.value).push().getKey();
	        	firebase.database().ref("/requests/"+record.value+"/"+request_key).set({
	        		meetup_id: that.state.meetupData.key,
	        		requestor: that.props.state.account.uid
	        	})
	        })
		}else{
			ToastAndroid.show(constants.INCOMPLETE_FRIEND, ToastAndroid.SHORT);
		}
	}

	renderLabel = (label, style) => {
	  console.log(label)
	  return (
	    <View style={{flexDirection: 'row', alignItems: 'center'}}>
	      <Image style={{width: 25, height: 25}} source={{uri: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-group-512.png'}} />
	      <View style={{marginLeft: 10}}>
	        <Text style={{fontSize:15}}>{label}</Text>
	      </View>
	    </View>
	  )
	}

	render(){
		return(
			<Container>
				<Header searchBar style={{justifyContent:'center', alignItems:'center', backgroundColor:"#114949"}}>
					 
					 <Left style={{flexDirection:'row', flex:1}}>
					 	<Icon name="md-person-add" style={{color:"white",marginRight:5}}/>
					 	<Text style={{marginLeft:10, color:"white", fontSize:18, fontWeight:'bold'}}>Send Meetup Invite</Text>
					 </Left>

					 <Right style={{flexDirection:"row",flex:1 }}>
						 <Button 
						 	transparent iconLeft
						 	//onPress={()=>this.sendRequests()}
							onPress={()=>console.log(this.state)}
						>
						 	<Text style={{color:"white", fontSize:18, fontWeight:'bold'}}>Send</Text>
						 </Button>
					 </Right>
				</Header>
				<Content>
				<View style={{backgroundColor:"#043333", width:"100%", alignItems:"center", justifyContent:"center", padding:15}}>
					<Text style={{fontSize:18, fontWeight:"bold", color:"white"}}>{this.state.meetupData.event_name}</Text>
				</View>

				<InputGroup style={{backgroundColor:'#fff',height:60, marginBottom:5, paddingLeft:4, paddingRight:4, paddingTop:10, paddingBottom:10}}>
			          <Icon name="ios-search" />
			          <Input 
			          	style={{height:60, fontSize:16, color:"#000"}} 
			          	selectTextOnFocus={true} 
			          	onChangeText={(searchValue)=>this.setState({searchValue})}
			          	placeholder="Search friend from list . . .">
			          	{this.state.searchValue}
			          </Input>
			        </InputGroup>
					{this.state.isGettingData ? <Spinner color='#000'/>:null}
					<SelectMultiple
					//update sa nakwa na record sa sulod ka willMount
			          items={this.props.state.account.friendsLabel}
			          renderLabel={this.renderLabel}
			          selectedItems={this.state.selectedFriends}
			          onSelectionsChange={this.onSelectionsChange} 
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

export default connect(mapStateToProps,mapDispatchToProps)(SendMeetupInviteScreen);