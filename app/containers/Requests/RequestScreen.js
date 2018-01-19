import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Content, Form, Input, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';

import styles from '../../styles/styles_main'

class MeetupScreen extends Component {

	constructor(props) {
	  super(props);
	 	let dsRequests = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2});
		this.state = {
	      requestsDataSource: dsRequests,
	    };
	    this.renderRow = this.renderRow.bind(this)
	}

	componentWillMount(){
		this.getRequestsList(this.props.state.account.uid);
	}

	componentDidMount() {	
	    var that = this;
		    BackHandler.addEventListener('hardwareBackPress', function() {
		    that.props.navigation.goBack();return true;
		});
	}

	getRequestsList(id){
		var that = this;

		list = [];
		list.push({
			key: "123",
		});	
		that.setState({
			requestsDataSource: that.state.requestsDataSource.cloneWithRows(list)
		})
	}

	renderRow(item){
		//const event_date = moment(item.event_date).format('LL');
		const { navigate } = this.props.navigation;
		return(
			<View>
				<CardItem style={{marginBottom:5}}>
					<View style={{flexDirection:'column', marginTop:5}}>
				        <View style={{flexDirection:'row', marginRight:10, marginLeft: 5}}>
					        <View>
					        	<Image 
					        		style={{width: 100, height:100, borderRadius:50, marginTop:3, marginLeft:15}}
					        		source={{uri:"https://lh3.googleusercontent.com/-7JyHe5tfUL0/AAAAAAAAAAI/AAAAAAAAAAA/AFiYof2xHlhT9sULWd6vTyCo2mvjndXRlA/s96-c/photo.jpg"}}
					        	/>
					        </View>
					        <View style={{flexDirection:'column', width:230, marginLeft:20, paddingRight:35}}>
						        <Text style={styles.meetupTitle}>Fun Run 2017</Text>
						        <Text style={{fontWeight:'bold'}}>Bacolod Public Plaza</Text>
						        <Text>Bacolod City</Text>
						        <Text style={{marginBottom:8}}>February 1, 2018 (5:30AM)</Text>
						        <Text>By: Edbert Jason Estevez</Text>
					        </View>
				      	</View>
				      	<View style={{flexDirection:'row', marginTop:20, marginBottom:15, justifyContent:'center'}}>
					      	<Button iconLeft transparent bordered rounded danger style={{margin:5, paddingLeft:25, paddingRight:30}}> 
					      		<Icon name='close' style={{marginRight:8}} size={20}/>
					      		<Text>Decline</Text>
					      	</Button>
					      	<Button onPress={()=>alert("Accept")} iconLeft transparent bordered rounded  success style={{margin:5, paddingLeft:25, paddingRight:40}}> 
					      		<Icon name='check' style={{marginRight:8}} size={20}/>
					      		<Text>Accept</Text>
					      	</Button>
					      	
				      	</View>
			      	</View>
			     </CardItem>

				<CardItem style={{marginBottom:5}}>
					<View style={{flexDirection:'column', marginTop:5}}>
				        <View style={{flexDirection:'row', marginRight:10, marginLeft: 5}}>
					        <View>
					        	<Image 
					        		style={{width: 100, height:100, borderRadius:50, marginTop:3, marginLeft:15}}
					        		source={{uri:"https://profiles.onshape.com/62ed0e33daab89201831c978581fce85e765efb88b09d62d88d1bf278480a499.png"}}
					        	/>
					        </View>
					        <View style={{flexDirection:'column', width:230, marginLeft:20, paddingRight:35}}>
						        <Text style={styles.meetupTitle}>Birthday Event</Text>
						        <Text style={{fontWeight:'bold'}}>ROBINSONS PLACE BACOLOD</Text>
						        <Text>Lacson St, Bacolod, 6100 Negros Occidental</Text>
						        <Text style={{marginBottom:8}}>October 2, 2018 (3:05PM)</Text>
						        <Text>By: Michael Angelo</Text>
					        </View>
				      	</View>
				      	<View style={{flexDirection:'row', marginTop:20, marginBottom:15, justifyContent:'center'}}>
					      	<Button iconLeft transparent bordered rounded danger style={{margin:5, paddingLeft:25, paddingRight:30}}> 
					      		<Icon name='close' style={{marginRight:8}} size={20}/>
					      		<Text>Decline</Text>
					      	</Button>
					      	<Button iconLeft transparent bordered rounded  success style={{margin:5, paddingLeft:25, paddingRight:40}}> 
					      		<Icon name='check' style={{marginRight:8}} size={20}/>
					      		<Text>Accept</Text>
					      	</Button>
					      	
				      	</View>
			      	</View>
			     </CardItem>
			</View>
		);

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