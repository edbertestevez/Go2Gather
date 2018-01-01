import React, {Component} from 'react'
import { TouchableOpacity, View, Text, ToastAndroid } from 'react-native'
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Zocial";
import styles from '../../styles/style_login';


class LoginOptions extends Component {
	render(){
		return(
			<View>
				{/*GOOGLE PLUS*/}
		        <TouchableOpacity style={[styles.optionButton,styles.bgRed]} onPress={this.props.googleSignin}>
		          <View style={styles.optionIcon}>
		            <Icon name="googleplus" style={styles.buttonIcon} size={30}/>
		          </View>
		          <View style={styles.optionText}>
		            <Text style={styles.buttonText}>Sign in with Google+</Text>  
		          </View>
		        </TouchableOpacity>

		        {/*FACEBOOK*/}
		        <TouchableOpacity style={[styles.optionButton,styles.bgBlue]} onPress={this.props.fbSignin}>
		          <View style={styles.optionIcon}>
		            <Icon name="facebook" style={styles.buttonIcon} size={30}/>
		          </View>
		          <View style={styles.optionText}>
		            <Text style={styles.buttonText}>Login with Facebook</Text>  
		          </View>
		        </TouchableOpacity>
	        </View>
		);
	}
	
}

LoginOptions.propTypes = {
  googleSignin: PropTypes.func,
  fbSignin: PropTypes.func
};


export default LoginOptions;