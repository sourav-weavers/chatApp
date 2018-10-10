import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage } from 'react-native';
import InputBox from './../components/InputBox';
import SubmitBtn from './../components/submitBtn';
import { Navigation } from 'react-native-navigation';
import { navigator_style } from './../navigatorStyle';
import * as firebase from 'firebase';

class AddRoomScreen extends Component {
  static navigatorStyle = navigator_style;
  state= { 
    roomName: ''
  }
  constructor(props){
    super(props);
  }
  handleText = (text,type) => {
    if(type=='Room Name'){
      this.setState({roomName: text})
    }
  }

  submitPress = () => {
    firebase.database().ref('chatrooms').push({
      roomname:this.state.roomName
    }).then(()=>{
      this.props.navigator.dismissModal({
        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
    })  
  }

  render(){
    return(
      <View style={styles.container}>
        <InputBox style={styles.inputBox} fiedName="Room Name" fiedPlcHldr="Enter a room name" handletext={this.handleText}/> 
        <SubmitBtn submitText="Add room" checkUsr = {this.submitPress}/>
      </View>
    )
  }
}
export default AddRoomScreen;
const styles = StyleSheet.create({
  container: {
    flex : 3,
    alignItems: 'center',
    justifyContent: 'center'
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