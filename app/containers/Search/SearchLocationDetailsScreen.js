import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, Alert,StyleSheet	} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
//FIREBASE
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {List, Tabs, Tab,ListItem,Container, Header, Spinner, Thumbnail, Content, Form, Input, Item, InputGroup, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import styles from '../../styles/styles_main'
import * as constants from '../../constants'

class SearchLocationDetailsScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	
	  };
	}
	
	componentWillMount(){
	
	}


	render(){
		const searchDetails = this.props.state.location.locationSearchDetails;
		const searchData = this.props.state.location.locationSearchData;
		return(
			<Container>
					{searchDetails.photos?
					searchDetails.photos.map((record,index)=>{
						if(index==0){
							const imageHeader = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+record.photo_reference+"&key=AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0";
							return(
								<Image key={index} style={{width:"100%", height: 200}} source={{uri:imageHeader}}/>
							)
						}
					}):null}
						
					<View style={{width:"100%", height:120, padding:15, backgroundColor:"#009999"}}>
						<Text style={{fontSize:24, color:"white"}}>{searchDetails.name}</Text>
						{searchDetails.rating ? 
						<Text style={{fontSize:14, color:"white", marginTop:7}}>Ratings: {searchDetails.rating}</Text>
						:
						<Text style={{fontSize:14, color:"white", marginTop:7}}>Ratings: Not available</Text>
						}
						<Text style={{fontSize:14, color:"white", marginTop:7}}>{searchData.types}</Text>
					</View>
					
					<Tabs initialPage={0} locked={true} tabBarUnderlineStyle={{height:2}}>
			          <Tab heading="OVERVIEW" activeTabStyle={{backgroundColor:"#017070"}} tabStyle={{backgroundColor:"#017070"}} textStyle={{color:"white", fontSize:14}}>
			            
			            	<View style={{maxHeight:110, flexDirection:"row", flex:1, borderBottomWidth:1, borderColor:"#cacaca"}}>
			            		<Button vertical transparent style={{flex:1,paddingTop:20, paddingBottom:20}}>
					              <Icon active name="directions" size={30} style={{color:"#039999"}} />
					              <Text style={{color:"#039999", marginTop:10, fontWeight:"bold"}}>DIRECTIONS</Text>
					            </Button>

					            <Button vertical transparent style={{flex:1,paddingTop:20, paddingBottom:20}}>
					              <Icon active name="group-add" size={30} style={{color:"#039999"}} />
					              <Text style={{color:"#039999", marginTop:10, fontWeight:"bold"}}>SET MEETUP</Text>
					            </Button>

					            <Button vertical transparent style={{flex:1,paddingTop:20, paddingBottom:20}}>
					              <Icon active name="star-border" size={30} style={{color:"#039999"}} />
					              <Text style={{color:"#039999", marginTop:10, fontWeight:"bold"}}>FAVORITE</Text>
					            </Button>
			            	</View>

			            	<List>
					            <ListItem style={{marginTop:10, marginBottom:10}} icon>
					             <Left>
					                <Icon name="location-on" size={25}/>
					              </Left>
					              <Body>
					              	<Text>{searchDetails.formatted_address}</Text>
					            	</Body>
					            </ListItem>
					            <ListItem style={{marginTop:10, marginBottom:10}} icon>
					              <Left>
					                <Icon name="access-time" size={25}/>
					              </Left>
					              <Body>
					              {searchDetails.open_now != null ?
					              		searchDetails.open_now == true ?
						              	<Text style={{color:"green", fontWeight:"bold"}}>Open</Text>
						              	:
						              	<Text style={{color:"red", fontWeight:"bold"}}>Closed</Text>
					              	: 
					              	<Text>Not available</Text>
					              }
					            	</Body>
					            </ListItem>
					            <ListItem style={{marginTop:10, marginBottom:10}} icon>
					              <Left>
					                <Icon name="web" size={25}/>
					              </Left>
					              <Body>
					              	{searchDetails.website ? 
					              	<Text>{searchDetails.website}</Text>
					            	:
					            	<Text>No website</Text>
					            	}
					            	</Body>
					            </ListItem>

					            <ListItem style={{marginTop:10, marginBottom:10}} icon>
					              <Left>
					                <Icon name="local-phone" size={25}/>
					              </Left>
					              <Body>
					              {searchDetails.formatted_phone_number ? 
					              	<Text>{searchDetails.formatted_phone_number}</Text>
					            	:
					            	<Text>Not available</Text>
					            }
					            	</Body>
					            </ListItem>
					          </List>

					          <Text style={{fontWeight:"bold", margin:18}}>All Reviews</Text>
			          			<List>
					            {searchDetails.reviews ? 
					            	searchDetails.reviews.map((record,index)=>{
					            		return(
						            		<ListItem key={index} style={{alignItems: 'flex-start', paddingBottom:20, borderBottomWidth:1, borderColor:"#e2e2e2"}}>
								             <Thumbnail square style={{marginRight:15}} size={80} source={{ uri: record.profile_photo_url }} />
								              
								              <Body>
								                <Text style={{fontWeight:"bold", color:"#000"}}>{record.author_name}</Text>
								                <Text note>{record.text}</Text>
								              </Body>
								            </ListItem>
							            )
					            	})
					            	:null
					            }
						        </List>
						    
			          </Tab>

			          <Tab heading="REVIEWS" activeTabStyle={{backgroundColor:"#017070"}} tabStyle={{backgroundColor:"#017070"}} textStyle={{color:"white", fontSize:14}}>
			            
			            <View style={{flex:1, minHeight:80, maxHeight:80, backgroundColor:"#004747", alignItems:"center",justifyContent:"center"}}>
			            	{searchDetails.rating ? 
							<Text style={{color:"white", fontSize:30}}>{searchDetails.rating}</Text>
							:
							<Text style={{color:"white", fontSize:30}}>No ratings</Text>
							}
			            </View>
			            <List>
			            {searchDetails.reviews ? 
			            	searchDetails.reviews.map((record,index)=>{
			            		return(
				            		<ListItem key={index} style={{alignItems: 'flex-start', paddingBottom:20, borderBottomWidth:1, borderColor:"#e2e2e2"}}>
						             <Thumbnail square style={{marginRight:15}} size={80} source={{ uri: record.profile_photo_url }} />
						              
						              <Body>
						                <Text style={{fontWeight:"bold", color:"#000"}}>{record.author_name}</Text>
						                <Text note>{record.text}</Text>
						              </Body>
						            </ListItem>
					            )
			            	})
			            	:null
			            }
				        </List>
				        
			          </Tab>

			          <Tab heading="PHOTOS" activeTabStyle={{backgroundColor:"#017070"}} tabStyle={{backgroundColor:"#017070"}} textStyle={{color:"white", fontSize:14}}>
			           
			           {searchDetails.photos?
						searchDetails.photos.map((record,index)=>{
								const imageValue = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+record.photo_reference+"&key=AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0";
								return(
									<Image key={index} style={{width:"100%", marginTop:5, marginRight:3, marginLeft:3, height: 200}} source={{uri:imageValue}}/>
								)
						}):null}
			           
					
						
			          </Tab>
			        </Tabs>
					
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

export default connect(mapStateToProps,mapDispatchToProps)(SearchLocationDetailsScreen);