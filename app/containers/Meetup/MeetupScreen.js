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
	      //meetups:[],
			isGettingData: true
	    };
	    this.meetupList = [];
		
	}

	componentWillMount(){
		//this.getList("r7j4h1KOmOXekp3ZNZ2xXfX7Qgc2");
		//this.getList(this.props.state.account.uid);
	}

	componentDidMount() {
	    var that = this;
	    BackHandler.addEventListener('hardwareBackPress', function() {
	    //that.props.navigation.goBack();
	    that.props.navigation.navigate("HomeMain")
	    return true;
	   });

	    //sample
	    this.setState({
	    	isGettingData:false
	    })
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
	      				extraData={this.props.state}
	      				data={this.props.state.meetups.meetupList}
	      				renderItem={({item,index})=>{
	      					return(
	      						<TouchableOpacity 
									key={index}
									onPress={()=>this.props.navigation.navigate("ViewMeetup", {info:item})}
									//onPress={()=>alert(JSON.stringify(item))}
									style={{backgroundColor:'white', marginBottom:5}}>
									<CardItem style={{marginBottom:5, flexWrap:"wrap"}}>
								        <View style={{flexDirection:'row'}}>
									        <View style={{flexDirection:'column', width:"92%",flexWrap:"wrap", marginRight:50, marginLeft: 15}}>
										        <Text style={styles.meetupTitle}>{item.event_name}</Text>
										        <Text style={{fontWeight:'bold'}}>{item.event_location}</Text>
										        <Text style={{marginRight:10}}>{item.event_address}</Text>
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