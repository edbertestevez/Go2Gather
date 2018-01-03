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

import styles from '../../styles/styles_main'

class ProfileScreen extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	name:'',
	  	email: '',
	  	phone: '',
	  	photo: '',
	  };
	  
	}
	componentDidMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
    that.props.navigation.goBack();return true;
   });
  }

	componentWillMount(){
		this.setState({
			name:this.props.state.account.name,
		  	email: this.props.state.account.email,
		  	phone: this.props.state.account.phone,
		  	photo: this.props.state.account.photo,
		});
	}

	render(){
		return(
			<Container>
				<Header style={{backgroundColor:'#4d5563',shadowOpacity: 0,elevation:0}}>
		          <Left style={{ flex: 1 }}>
		            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
		              <Icon name='menu' size={24} style={{color:'white'}} />
		            </Button>
		          </Left>
		          <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
		            <Title>Profile</Title>
		          </Body>
		          <Right style={{ flex: 1 }}>
		          	
		          </Right>
		        </Header>

				<Content style={{}}>
					<View style={{alignItems:'center',height: 320,backgroundColor:'#4d5563'}}>
						<Image source={{uri: this.state.photo}} style={styles.profileImage}/>
						<Text style={styles.user_name}>{this.state.name}</Text>
						<Button info style={{width:150, justifyContent:'center',alignSelf:'center',marginTop:10}}>
			            	<Text style={{color:'#fff'}}>Edit Profile</Text>
			            </Button>
					</View>
					<Form style={{marginLeft: 10, marginRight: 30, marginTop:15}}>
		            	<Item stackedLabel>
		              	<Label>E-mail</Label>
		              	<Input editable = {true} selectTextOnFocus={true} onChangeText={(email)=>this.setState({email})}>{this.state.email}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Phone:</Label>
		              	<Input editable = {true} selectTextOnFocus={true} onChangeText={(phone)=>this.setState({phone})} placeholder="Enter item name">{this.state.phone}</Input>
		            	</Item>

		            	<Item stackedLabel>
		              	<Label>Photo:</Label>
		              	<Input editable = {true} selectTextOnFocus={true} onChangeText={(photo)=>this.setState({photo})} placeholder="Enter item name">{this.state.photo}</Input>
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

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);