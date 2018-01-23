import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ToastAndroid, Image, Dimensions, ScrollView} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {Container, Header, Spinner, Content, Thumbnail, Form, Input, Item, Label, Footer, List, ListItem, StyleProvider, Left, Right, Button, Body, Title, Tab, Tabs, TabHeading} from 'native-base';
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

	}

	componentDidMount() {
	    var that = this;
	    BackHandler.addEventListener('hardwareBackPress', function() {
	    that.props.navigation.goBack();return true;
	   });
	}

	render(){
		return(
			<Container>
				<Header 
					//style={styles.header}
					style={{elevation:0, backgroundColor:"#032d2d"}}
				>
					<Left>
						<Icon name="arrow-back" size={27} style={{color:"white"}}/>
					</Left>
					<Right>
						<Icon name="delete" size={30} style={{color:"white", marginRight:5}}/>
					</Right>
				</Header>
				<Content>
					<View style={{width:"100%",backgroundColor:"#032d2d", justifyContent:'center',alignItems:'center'}}>
						<ResponsiveImage source={require('../../img/logo.png')} initWidth="100" initHeight="100" style={{marginBottom:0, marginTop:-5}}/>
						<Text style={styles.viewMeetupTitle}>Date Naman Sa Plaza Mart</Text>
						<View style={{flexDirection:"row"}}>
							<Button 
								rounded success iconLeft 
								style={styles.roundButton}
							>
								<Icon name="edit" size={22} style={{color:"white", marginRight:10}}/>
								<Text style={{color:"white", fontSize:14}}>Edit Meetup</Text>
							</Button>
							<Button 
								rounded primary iconLeft
								style={styles.roundButton}
							>
								<Icon name="send" size={22} style={{color:"white", marginRight:10}}/>
								<Text style={{color:"white", fontSize:14}}>Invite Friends</Text>
							</Button>
						</View>
					</View>
					
					<Tabs tabBarUnderlineStyle={{backgroundColor:"#468484"}}>
			          <Tab 
			          	heading="Details" 
			          	tabStyle={{backgroundColor:'#f2f7f7'}} 
			          	activeTabStyle={{backgroundColor:'#f2f7f7'}} 
			          	textStyle={{color:"#016666"}} 
			          	activeTextStyle={{color:"#016666"}}>
			          	<View>
			          		<Form style={{paddingLeft:5, paddingRight:10, marginTop:10}}>
			          			<Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Created By</Label>
					              <Input value="Edbert Jason Estevez" underlineColorAndroid="transparent" disable/>
					            </Item>
					            <Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Meetup Place</Label>
					              <Input value="Plaza Mart Bacolod" disabled/>
					            </Item>
					            <Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Address</Label>
					              <Input selectTextOnFocus={true} maxLength = {45} disabled value="San Juan St, Bacolod, 6100 Negros Occidental, Philippines"/>
					            </Item>
					            <Item stackedLabel>
					              <Label style={{fontWeight:"bold"}}>Date</Label>
					              <Input value="January 28, 2018" disabled/>
					            </Item>
					            <Item stackedLabel last>
					              <Label style={{fontWeight:"bold"}}>Time</Label>
					              <Input value="11:30AM" disabled/>
					            </Item>
					            
					          </Form>
			          	</View>
			          </Tab>


			          <Tab heading="Going (4)"  
			          	tabStyle={{backgroundColor:'#f2f7f7'}} 
			          	textStyle={{color:"#016666"}} 
			          	activeTextStyle={{color:"#016666"}} 
			          	activeTabStyle={{backgroundColor:'#f2f7f7'}}>
			          	<List>
			            	<ListItem>
				              <Left style={{flex:1}}>
				                <Thumbnail width={50} height={50} source={{uri: "https://e27.co/img/no_profile_image.png"}} />
				              </Left>
				              <Body style={{flex:3}}>
				                <Text style={{fontSize:14}}>Sample User</Text>
				              </Body>
				              <Right style={{flex:1}}>
				                <Text style={{color:"#660000"}}>Remove</Text>
				              </Right>
				            </ListItem>

				            <ListItem>
				              <Left style={{flex:1}}>
				                <Thumbnail width={50} height={50} source={{uri: "https://e27.co/img/no_profile_image.png"}} />
				              </Left>
				              <Body style={{flex:3}}>
				                <Text style={{fontSize:14}}>Sample User</Text>
				              </Body>
				              <Right style={{flex:1}}>
				                <Text style={{color:"#660000"}}>Remove</Text>
				              </Right>
				            </ListItem>

				            <ListItem>
				              <Left style={{flex:1}}>
				                <Thumbnail width={50} height={50} source={{uri: "https://e27.co/img/no_profile_image.png"}} />
				              </Left>
				              <Body style={{flex:3}}>
				                <Text style={{fontSize:14}}>Sample User</Text>
				              </Body>
				              <Right style={{flex:1}}>
				                <Text style={{color:"#660000"}}>Remove</Text>
				              </Right>
				            </ListItem>

				            <ListItem>
				              <Left style={{flex:1}}>
				                <Thumbnail width={50} height={50} source={{uri: "https://e27.co/img/no_profile_image.png"}} />
				              </Left>
				              <Body style={{flex:3}}>
				                <Text style={{fontSize:14}}>Sample User</Text>
				              </Body>
				              <Right style={{flex:1}}>
				                <Text style={{color:"#660000"}}>Remove</Text>
				              </Right>
				            </ListItem>

			          	</List>

			          	</Tab>
			        </Tabs>
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