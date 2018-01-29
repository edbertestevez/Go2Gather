import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Header, Content, Form, Input, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import * as firebase from 'firebase';
import styles from '../../styles/styles_main'

class OtherProfileScreen extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	key:'',
	  	name:'',
	  	email: "",
	  	phone: '',
	  	photo: '',
	  	sentMeRequest:false,
	  	requestFromMe:false,
	  };
	  
	}
	componentDidMount() {
	    var that = this;
	    BackHandler.addEventListener('hardwareBackPress', function() {
	    that.props.navigation.navigate("HomeMain");return true;
	   });
	  }

	componentWillMount(){
		const {state} = this.props.navigation;
		firebase.database().ref("/friend_requests/"+this.props.state.account.uid+"/"+state.params.info.key).on("child_added", (snapshot)=>{
			if(snapshot.key=="status"){
				var val = snapshot.val();
				this.setState({sentMeRequest:val})
			}
		});
		firebase.database().ref("/friend_requests/"+state.params.info.key+"/"+this.props.state.account.uid).on("child_added", (snapshot)=>{
			if(snapshot.key=="status"){
				var val = snapshot.val();
				this.setState({requestFromMe:val})
			}
		});
		this.setState({
			key: state.params.info.key,
			name:state.params.info.name,
		  	email: state.params.info.email,
		  	phone: state.params.info.phone,
		  	photo: state.params.info.photo,
		});
	}

	removeFriend(){
		var that = this;
		firebase.database().ref("/users_friends/"+that.props.state.account.uid+"/"+that.state.key).remove()
		.then(ToastAndroid.show("Removed as friend", ToastAndroid.SHORT))
	}

	addFriend(){
		var that = this;
		firebase.database().ref("/friend_requests/"+that.state.key+"/"+that.props.state.account.uid).set({
			status:true
		})
		.then(ToastAndroid.show("Friend request sent", ToastAndroid.SHORT))
	}

	confirmFriend(){
		firebase.database().ref("/friend_requests/"+that.props.state.account.uid+"/"+that.state.key).remove()
		.then(firebase.database().ref("/users_friends/"+that.props.state.account.uid+"/"+that.state.key).set({
			status:true
		}))
		.then(ToastAndroid.show('Friend added successfully', ToastAndroid.SHORT))
	}

	declineRequest(){
		var that = this;
		firebase.database().ref("/friend_requests/"+that.props.state.account.uid+"/"+that.state.key).set({
			status:false
		})
		.then(ToastAndroid.show("Declined friend request", ToastAndroid.SHORT))	
	}

	cancelRequest(){
		var that = this;
		firebase.database().ref("/friend_requests/"+that.state.key+"/"+that.props.state.account.uid).remove()
		.then(ToastAndroid.show("Cancelled Friend Request", ToastAndroid.SHORT))
	}


	render(){
		return(
			<Container>
				<Header style={{backgroundColor:'#4d5563',shadowOpacity: 0,elevation:0}}>
		          <Left style={{ flex: 1 }}>
		            <Button>
		              <Icon name='arrow-back' size={24} style={{color:'white'}} />
		            </Button>
		          </Left>
		          <Body style={{ flex: 5,  justifyContent: 'center', alignItems: 'center' }}>
		            <Title>User Information</Title>
		          </Body>
		          <Right style={{ flex: 1 }}>
		          	
		          </Right>
		        </Header>

				<Content style={{}}>
					<View style={{alignItems:'center', justifyContent:"center", backgroundColor:'#4d5563'}}>
						{/*<Image source={{uri: this.state.photo}} style={styles.profileImage}/>*/}
						<Image source={{uri:"https://e27.co/img/no_profile_image.png"}} style={styles.profileImage}/>
						<Text style={styles.user_name}>{this.state.name}</Text>
						
						{this.props.state.account.friendsLabel.findIndex((record)=>record.value==this.state.key) > -1 ?
						<View>
							<Button 
								iconLeft danger rounded 
								style={styles.roundButtonNoIcon}
								onPress={()=>this.removeFriend()}>
								<Text style={styles.buttonWhiteText}>Remove as Friend</Text>
							</Button>
						</View>
						:
						this.state.sentMeRequest ?
						<View style={{flexDirection:"row", marginBottom:15}}>
							<Button 
								style={styles.selectRoundButton} 
								rounded success
								onPress={()=>this.confirmFriend()}
							>
								<Text style={styles.buttonWhiteText}>Confirm</Text>
							</Button>
							<Button 
								style={styles.selectRoundButton} 
								rounded bordered light
								onPress={()=>this.declineRequest()}
							>
								<Text style={styles.buttonWhiteText}>Decline</Text>
							</Button>
						</View>
						:
						this.state.requestFromMe ?
						<View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
							<View>
							<Button iconLeft info transparent rounded style={styles.roundButtonNoBottomProfile}>
								<Icon name="check-circle" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Friend Request Sent</Text>
							</Button>
							</View>
							<View>
							<Button 
								iconLeft info rounded 
								style={styles.roundButtonNoIcon}
								onPress={()=>this.cancelRequest()}
							>
								<Text style={styles.buttonWhiteText}>Cancel Request</Text>
							</Button>
							</View>
						</View>
						:
						<View>
							<Button 
								iconLeft info rounded 
								style={styles.roundButton}
								onPress={()=>this.addFriend()}
							>
								<Icon name="person-add" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Add Friend</Text>
							</Button>
						</View>
						
						}

						{/*<View>
							<Button iconLeft info rounded style={styles.roundButton}>
								<Icon name="person-add" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Add Friend</Text>
							</Button>
						</View>*/}

						{/*<View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
							<View>
							<Button iconLeft info transparent rounded style={styles.roundButtonNoBottomProfile}>
								<Icon name="check-circle" size={20} style={{color:"white", marginRight:10}}/>
								<Text style={styles.buttonWhiteText}>Friend Request Sent</Text>
							</Button>
							</View>
							<View>
							<Button iconLeft info rounded style={styles.roundButtonNoIcon}>
								<Text style={styles.buttonWhiteText}>Cancel Request</Text>
							</Button>
							</View>
						</View>*/}

			            <View style={{marginBottom:20, flexDirection:"row"}}>
			            	<Button transparent style={{borderRightWidth:1, borderColor:"#cacaca", padding:25}}>
			            		<View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
			            			<Text style={{color:"white", fontSize: 18}}>2</Text>
			            			<Text style={{color:"white", fontSize: 14}}>Meetups</Text>
			            		</View>
			            	</Button>
			            	<Button transparent style={{borderRightWidth:1, borderColor:"#cacaca", padding:25}}>
			            		<View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
			            			<Text style={{color:"white", fontSize: 18}}>5</Text>
			            			<Text style={{color:"white", fontSize: 14}}>Requests</Text>
			            		</View>
			            	</Button>
			            	<Button transparent style={{borderColor:"white", padding:25}}>
			            		<View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
			            			<Text style={{color:"white", fontSize: 18}}>10</Text>
			            			<Text style={{color:"white", fontSize: 14}}>Friends</Text>
			            		</View>
			            	</Button>
			            </View>
					</View>
					<Form style={{marginLeft: 10, marginRight: 30, marginTop:15}}>
		            	<Item stackedLabel>
		              	<Label>Name:</Label>
		              	<Input editable = {false} selectTextOnFocus={true} onChangeText={(name)=>this.setState({name})}>{this.state.name}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>E-mail:</Label>
		              	<Input editable = {false} selectTextOnFocus={true} onChangeText={(email)=>this.setState({email})}>{this.state.email}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Phone:</Label>
		              	<Input editable = {false} selectTextOnFocus={true} onChangeText={(phone)=>this.setState({phone})}>{this.state.phone}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Photo:</Label>
		              	<Input editable = {false} selectTextOnFocus={true} onChangeText={(photo)=>this.setState({photo})}>{this.state.photo}</Input>
		            	</Item>
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

export default connect(mapStateToProps,mapDispatchToProps)(OtherProfileScreen);