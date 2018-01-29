import React from 'react'
import { StyleSheet, Text, View, Image, BackHandler, Alert} from 'react-native'
import { NavigationActions } from 'react-navigation'
import styles from '../styles/styles_drawer';
import { Container, Content, Icon, List, ListItem, Footer, FooterTab, Button } from "native-base";
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'

const routes = [
{title:"Home",routeName:"Home",icon:"home"},
{title:"Profile",routeName:"Profile",icon:"md-person"},
{title:"Meetup List",routeName:"Meetup",icon:"people"},
{title:"Meetup Requests",routeName:"Requests",icon:"md-star"},
{title:"Friend Requests",routeName:"FriendRequests",icon:"md-person-add"}
];

class DrawerContainer extends React.Component {

componentDidMount() {
  var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
    Alert.alert(
        'Exit App',
        'Are you sure you want to exit the app?',
        [
        {text: 'Exit', onPress: () => RNExitApp.exitApp()},
          {text: 'Cancel',  style: 'cancel'},
        ],
        { cancelable: false }
      );
    return true;
   });
   console.log("DRAWER NA KO", this.props.state.nav)
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Content style={styles.container}>
            <View style={styles.header}>
              <Image source={require('../img/drawer_header.jpg')} style={{width:300, height:170,zIndex:-1,position: 'absolute'}}/>
              {this.props.state.account.photo ?
              <Image source={{uri: this.props.state.account.photo}} style={styles.circleImage}/>
              :null}
              <Text style={styles.accountName}>{this.props.state.account.name}</Text>
              <Text style={styles.accountEmail}>{this.props.state.account.email}</Text>
            </View>
            <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  style={{backgroundColor:'rgba(255, 255, 255, 0)',borderBottomWidth: 0}}
                  onPress={() => this.props.navigation.navigate(data.routeName)}>
                  <Icon name={data.icon} style={{color:'#636b6d'}} />
                  <Text style={{fontSize:14, marginLeft:20}}>{data.title}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
        <Footer style={{backgroundColor:'#fafafa', height:65, justifyContent: 'center', alignItems:'center', padding:10}}>
            <Button 
              style={{width:250, backgroundColor:'#660000', marginBottom:20, justifyContent:'center'}}
              onPress={()=>this.props.actions.func_googleSignout()}>
              <Text style={{color:'white', fontSize:14}}>Logout</Text>
            </Button>
        </Footer>
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

export default connect(mapStateToProps,mapDispatchToProps)(DrawerContainer);