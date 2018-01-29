import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions, Alert} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Content, Form, Input, Item, Label, Spinner, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import * as constants from '../../constants'

import styles from '../../styles/styles_main'

class FriendRequestScreen extends Component {

	constructor(props) {
	  super(props);
	 	this.state = {
	      requests:[],
	      isGettingData: false
	    };   
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();return true;
		});
	}

	acceptRequest(user_uid){
		var that = this;
		firebase.database().ref("/users_friends/"+that.props.state.account.uid+"/"+user_uid).set({
			status:true
		})
		.then(
			firebase.database().ref("/friend_requests/"+that.props.state.account.uid+"/"+user_uid).remove()
		)
		.then(ToastAndroid.show(constants.ADDED_FRIEND_SUCCESS,ToastAndroid.SHORT))
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
		            <Title>Friend Requests</Title>
		          </Body>
		          <Right style={{flex:1}}/>
		        </Header>

	      		<Content style={{flex:1,zIndex:2}}>
	      			<FlatList
	      				extraData={this.props.state}
	      				data={this.props.state.account.friendRequests}
	      				renderItem={({item,index})=>{
	      					return(
	      							<CardItem key={index} style={{marginBottom:5, flexWrap:"wrap"}}>
								        <View style={{flexDirection:'row'}}>
									        <View>
									        	<ResponsiveImage initWidth="95" initHeight="95" source={{uri:item.requestor_photo}}/>
									        </View>
									        <View style={{flexDirection:'column', width:"92%",flexWrap:"wrap", marginRight:50, marginLeft: 15}}>
										        <View style={{marginBottom:10}}>
											        <Text style={styles.meetupTitle}>{item.requestor_name}</Text>
											        <Text>{item.requestor_email}</Text>
										        </View>
										        <View style={{flexDirection:"row"}}>
										        	<Button 
										        		style={styles.selectRoundButton} 
										        		rounded success
										        		onPress={()=>this.acceptRequest(item.requestor_key)}
										        	>
										        		<Text style={styles.buttonWhiteText}>Confirm</Text>
										        	</Button>
										        	<Button style={styles.selectRoundButton} rounded bordered light>
										        		<Text style={styles.buttonBlackText}>Decline</Text>
										        	</Button>
										        </View>
									      	</View>
								      	</View>
								     </CardItem>
	      					);
	      				}}
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

export default connect(mapStateToProps,mapDispatchToProps)(FriendRequestScreen);