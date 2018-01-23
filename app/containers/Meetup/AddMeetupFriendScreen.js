import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, Alert	} from "react-native";
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

//const users = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6']


class AddMeetupFriendScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	searchValue:"",
	  	friends:[],
	  	selectedFriends:[],
	  	isGettingData:true,
	  };
	  this.users=[];
	  this.labels=[];
	}


	componentWillMount(){
		firebase.database().ref("/users_friends/6qtCXPySzpN0LYg79kc0Ex4046m1").on("child_added",(snapshot)=>{
			firebase.database().ref("/users/"+snapshot.key).on("value",(dataSnap)=>{
				//console.log(dataSnap.child("name").val());
				this.users.push({
					value: snapshot.key,
					label: dataSnap.child("name").val()
				})
				this.labels.push(dataSnap.child("name").val())
				this.setState({
					friends:this.users,
					isGettingData:false
				})
			});
			
		});
		this.state.selectedFriends = this.props.state.meetups.selectedMeetupFriends;
	}

	onSelectionsChange = (selectedUsers) => {
		//console.log(selectedUsers)
		//actions to change props of selected users
		//this.props.actions.updateFriendMeetups(selectedUsers)
	    this.setState({ selectedFriends:selectedUsers })
	    console.log("SELECTED", this.state.selectedFriends)
	}

	saveValues(){
		this.props.actions.updateFriendMeetups(this.state.selectedFriends)
		this.props.navigation.navigate("AddMeetup")
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
					 
					 <Left style={{flexDirection:'row'}}>
					 	<Icon name="md-people" style={{color:"white"}}/>
					 	<Text style={{marginLeft:10, color:"white", fontSize:18, fontWeight:'bold'}}>Friends List</Text>
					 </Left>

					 <Right>
						 <Button 
						 	transparent
						 	onPress={()=>this.saveValues()}>
						 	<Text style={{color:"white", fontSize:18, fontWeight:'bold'}}>Save</Text>
						 </Button>
					 </Right>
				</Header>
				<Content>
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
			          items={this.users}
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

export default connect(mapStateToProps,mapDispatchToProps)(AddMeetupFriendScreen);