import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage } from 'react-native';
import InputBox from './../components/InputBox';
import SubmitBtn from './../components/submitBtn';
import { Navigation } from 'react-native-navigation';
import { navigator_style } from './../navigatorStyle';
state = {
  username: '',
}

class LandingScreen extends Component {
  static navigatorStyle = navigator_style;

  handleText = (text,type) => {
    if(type=='Username'){
      this.setState({username: text})
    }
  }

  submitPress = () => {
    AsyncStorage.setItem('username',this.state.username).then(()=>{
      this.props.navigator.push({
        screen: 'ChatRoomsScreen',
        title: 'Chat Rooms'
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.imgStyle} source={require('./../images/chatApp.png')}/>
        </View>
        <InputBox style={styles.inputBox} fiedName="Username" fiedPlcHldr="Enter your username" handletext={this.handleText}/> 
        <SubmitBtn submitText="Login" checkUsr = {this.submitPress}/>
      </View>
    )
  }
}

export default LandingScreen;
const styles = StyleSheet.create({
  container: {
    flex : 3,
    alignItems: 'center',
    //justifyContent: 'center'
  },
  imgContainer: {
    alignItems: 'center'
  },
  inputBox: {
    width: 400,
  },
  imgStyle : {
    
    height: 200,
    width : 200
  }
})