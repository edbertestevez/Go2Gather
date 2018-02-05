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
import {Container, Header, Spinner, Content, Form, Input, ListItem, Thumbnail, Item, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem, Fab} from 'native-base';
import * as firebase from 'firebase';
import moment from 'moment';

import styles from '../../styles/styles_main'

class SearchCategoryScreen extends Component {

	constructor(props) {
	  super(props);
	  let dsMeetups = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2});
		this.state = {
	        results:[
	        {name:"Villarosa Beach", ratings:"3.0", address:"Bacolod City, Negros Occidental", type:"Restaurant", image:"https://bacolodpages.com/sites/default/files/business/bp57910/slideshow-images/villarosa-beach-seafood-house.jpg"},
	        ]
	    };

		
	}


	render(){
		
		return(
			<Container style={{color:"white"}}>
				<Header style={[{shadowOpacity: 0,elevation:0, zIndex:10}, styles.header]}>
		          <Left style={{ flex: 1 }}/>
		          <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
		            <Title>Restaurants</Title>
		          </Body>
		          <Right style={{flex:1}}/>
		        </Header>

	      		<Content style={{flex:1,zIndex:2}}>
	      			<FlatList
	      				style={{margin:0, backgroundColor:"#f4f4f4"}}
	      				extraData={this.state}
	      				data={this.state.results}
	      				renderItem={({item,index})=>{
	      					return(
	      						<ListItem 
									key={index}
									//onPress={()=>this.props.navigation.navigate("ViewMeetup", {info:item})}
									//onPress={()=>alert(JSON.stringify(item))}
									style={{backgroundColor:'white'}}>
									    <Body>
									    <View style={{flexDirection:'column', flexWrap:"wrap", marginLeft: 15}}>
										    <Text style={styles.meetupTitle}>{item.name}</Text>
										    <Text>{item.address}</Text>
										    <Text style={{fontWeight:'bold'}}>Ratings: {item.ratings}</Text>
										    <Text style={{marginRight:10}}>{item.type} . Open</Text>
										    <Text></Text>
										</View>
										</Body>
										<Right>
											<Thumbnail square large source={{ uri: item.image }} style={{marginLeft:10}} />
										</Right>
								</ListItem>
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

export default connect(mapStateToProps,mapDispatchToProps)(SearchCategoryScreen);