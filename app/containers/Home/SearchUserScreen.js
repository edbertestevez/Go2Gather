import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions, Alert} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, FlatList } from "react-native";
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Content, Form, Input, Item, Label, InputGroup, Thumbnail, Icon, Spinner, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';
import * as constants from '../../constants'
import styles from '../../styles/styles_main'

class FriendRequestScreen extends Component {

	constructor(props) {
	  super(props);
	 	this.state = {
	      searchValue:"",
	      isGettingData: false,
	      searchResult:[],
	    };   
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();return true;
		});
	}

	searchUsers = (searchValue) => {
		this.setState({searchValue});
		return this.props.state.all_users.users_data.filter((records) =>
		   records.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
		);
	}
	
	checkUserRoute(item){
		var that = this;
		if(item.key==that.props.state.account.uid){
			that.props.navigation.navigate("Profile", {info:item})
		}else{
			that.props.navigation.navigate("OtherProfile", {info:item})
		}
	}

	render(){
		return(
			<Container>
				<Header style={[{shadowOpacity: 0,elevation:0, zIndex:10}, styles.header]}>
		        <Body style={{flex:1, alignItems:"center", justifyContent:"center"}}>
		          <InputGroup style={{backgroundColor:'#fff',borderRadius:20, marginTop:5,height:45, marginBottom:5, paddingLeft:4, paddingRight:4, paddingTop:10, paddingBottom:10}}>
			         <Icon name="ios-search" />
			          <Input 
			          	style={{height:60, fontSize:16, color:"#000"}} 
			          	selectTextOnFocus={true} 
			          	onChangeText={(searchValue)=>this.setState({searchResult:this.searchUsers(searchValue)})}
			          	placeholder="Search user">
			          	{this.state.searchValue}
			          </Input>
			          {this.state.searchValue ? <Icon onPress={()=>this.setState({searchValue:""})} style={{marginRight:5}} name="close" />:null}
			        	
			        </InputGroup>
		        </Body>
		        </Header>

	      		<Content>
	      			{this.state.searchValue ?
	      			<FlatList
	      				extraData={this.state}
	      				data={this.state.searchResult}
	      				renderItem={({item,index})=>{
	      					return(
	      						<TouchableOpacity 
									key={index}
									onPress={()=>this.checkUserRoute(item)}
									style={{backgroundColor:'white', marginBottom:5}}>
									<CardItem style={{flexWrap:"wrap"}}>
								        <View style={{flexDirection:'row', alignItems:"center"}}>
								         	<View>
								         		<Thumbnail width={45} height={45} source={{uri: item.photo}} />
									        </View>
									        <View style={{flexDirection:'column', width:"92%",flexWrap:"wrap", marginRight:50, marginLeft: 15}}>
										        <View style={{marginBottom:10}}>
											        <Text style={styles.meetupTitle}>{item.name}</Text>
											        <Text>{item.email}</Text>
										        </View>
									      	</View>
								      	</View>
								     </CardItem>
								</TouchableOpacity>
	      					);
	      				}}
			      	/>:null}
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