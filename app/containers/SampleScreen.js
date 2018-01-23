import React, { Component } from 'react';
import {Text, TextInput, Image, View, StyleSheet, TouchableOpacity, AsyncStorage, BackHandler} from 'react-native';
//import Icon from "react-native-vector-icons/Zocial";
import ResponsiveImage from 'react-native-responsive-image';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { Container, Header, Content, Button, Icon } from 'native-base';
//NAVIGATION
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
//STYLE
import styles from '../styles/style_login';
//COMPONENTS
import LoginOptions from '../components/login/loginOptions';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import * as firebase from 'firebase';
import SelectMultiple from 'react-native-select-multiple'

const fruits = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6']
const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{width: 42, height: 42}} source={{uri: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-group-512.png'}} />
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}
class SampleScreen extends Component {
constructor(props) {
  super(props);

  this.state = {
    selectedUsers: []
  };


}

onSelectionsChange = (selectedUsers) => {
    // selectedUsers is array of { label, value }
    this.setState({ selectedUsers })

  }

removeUser(index){
  var newArray = this.state.selectedUsers;
  newArray.splice(index,1);
  this.setState({
    selectedUsers:newArray
  })
}

render(){
   console.log(this.state.selectedUsers)
  return(
    <View>
        <SelectMultiple
          items={fruits}
          renderLabel={renderLabel}
          selectedItems={this.state.selectedUsers}
          onSelectionsChange={this.onSelectionsChange} />
      
        <View style={{flex:1, flexDirection:'row',flexWrap:"wrap", marginTop:3}}>
        {this.state.selectedUsers.map((record,index)=>{
          var val = JSON.stringify(record);
          return(
            <Button 
              rounded bordered key={index} 
              style={{paddingLeft:15, paddingTop:10, paddingBottom:10, paddingRight:2, margin:3}}
              onPress={()=>this.removeUser(index)}>
              <Text>{record.label}</Text>
              <Icon name='close' />
            </Button>
          )
        })}
        </View>
    </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(SampleScreen);