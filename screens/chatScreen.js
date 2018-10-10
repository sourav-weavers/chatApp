import React, { Component } from 'react';
import { View, StyleSheet, Image, ToastAndroid , AsyncStorage, Text, BackHandler , Button, Platform, ScrollView, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import InputBox from './../components/InputBox';
import SubmitBtn from './../components/submitBtn';
import { Navigation } from 'react-native-navigation';
import { navigator_style } from './../navigatorStyle';
import * as firebase from 'firebase';
import { Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
class ChatScreen extends Component {
  state = {
    messeges: [],
    isLoadiing: true,
    roomKey: '',
    userName: '',
    scrollViewSize: 0,
  }

  textInput='';
  componentDidMount = () => {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    AsyncStorage.getItem('username').then(data=>{
      this.setState({userName:data});
    });
    let chatKey = this.props.roomKey;
    this.setState({roomKey: chatKey});
    let chats = [];
    firebase.database().ref('chatrooms').child(chatKey).child('chats').once('value',messages=>{
      messages.forEach(message=>{
        chats.push({username: message.val().user, type: message.val().type,
        timestamp:message.val().sendDate, messege: message.val().messege, mKey: message.key })
      })
    }).then(()=>{
     
      this.setState({messeges: chats});
      firebase.database().ref('chatrooms').child(this.state.roomKey).child('chats').on('child_added',msg=>{
        chats.push({username: msg.val().user, type: msg.val().type,
          timestamp:msg.val().sendDate, messege: msg.val().messege, mKey: msg.key });
          this.setState({messeges: chats});
      })
      // console.log(this.state.messeges);
      // console.log(this.scrollView);
    })
  }
  contentSizeSet = (contentWidth,contentHeight) => {
    this.setState({scrollViewSize:contentHeight});
    this.refs.scrollView.scrollTo(contentHeight);
  }
  // handleBackButton() {
  //   ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
  //   return true;
  // }
  onNavigatorEvent(event) {
    console.log(event);
    switch (event.id) {
      case 'didAppear':
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        break;
      case 'quitRoom' :
         AsyncStorage.getItem('username').then(data=>{
          firebase.database().ref('chatrooms').child(this.state.roomKey).child('chats').push({
            messege: data+" quits this room.",
            sendDate: new Date().getTime(),
            type: 'exit',
            user: data
          }).then(()=>{
            this.setState({ messeges : [] })
            this.props.navigator.popToRoot({
              animated: true,
              animationType: 'slide-horizontal',
            });
          })
        })
        break;
      default:
        break;
    }
  }
  handleBackPress = () => {
    
    ToastAndroid.show("Press the button on the top right corner to exit the room",ToastAndroid.SHORT)
    return true;
  }
  ci
  loadmessages = () => {
    console.log('fetching');
    let chats = [];
    firebase.database().ref('chatrooms').child(this.state.roomKey).child('chats').on('child_added',messages=>{
      messages.forEach(message=>{
        chats.push({username: message.val().user, type: message.val().type,
        timestamp:message.val().sendDate, messege: message.val().messege, mKey: message.key })
      })
    })
      setTimeout(()=>{this.setState({messeges: chats});},2500);
      console.log(this.state.messeges);
  }
  send = () =>{
    console.log('working');
  }
  handleInput = (text) => {

  }
  sendMsg = () => {
      let message = [];
      message = this.state.messeges;
      let newMsg = this.textInput['_lastNativeText'];
      this.textInput.clear();
      // let key = firebase.database().ref('chatrooms').child(this.state.roomKey).child('chats').push();
      firebase.database().ref('chatrooms').child(this.state.roomKey).child('chats').push({
        messege: newMsg,
        sendDate: new Date().getTime(),
        type: 'message',
        user: this.state.userName
      })
  }
  static navigatorStyle = navigator_style;
  static navigatorButtons = {
    rightButtons : [
      {
        icon : require('../images/exit.png'),
        id: 'quitRoom'
      }
    ]
  }
  render(){
    let chats = this.state.messeges;
    let sortedChat = _.orderBy(chats,['sendDate'],['asc']);
    return(
      <KeyboardAwareScrollView extraScrollHeight = {12} >
        <ScrollView style={ styles.scroller} ref="scrollView" onContentSizeChange={this.contentSizeSet}>
        {
          sortedChat.map(item=>{
            if(item.type === 'message'){
              if(item.username === this.state.userName){
                return(
                  <View key={item.mKey}>{
                    <TouchableOpacity style={styles.welcomeSelf}>
                      <Text style={styles.chatNameUsr}>{item.username}</Text>
                      <Text style={styles.chatMsgUsr}>{item.messege}</Text>
                    </TouchableOpacity>
                    }
                  </View>
                )
              }
              else{
                return(
                  <View key={item.mKey}>{
                    <TouchableOpacity style={styles.welcome}>
                      <Text style={styles.chatNameOth}>{item.username}</Text>
                      <Text style={styles.chatMsgOth}>{item.messege}</Text>
                    </TouchableOpacity>
                    }
                  </View>
                )
              }
            }
            else{
              if(item.type === 'exit'){
                return(
                  <View  key={item.mKey} style={styles.joexMsg}>
                    <View style={styles.roomExit} key={item.mKey}>
                      <Text style={styles.roomExitMsg}>{item.messege}</Text>
                    </View>
                  </View>
                )
              }
              else{
                return(
                  <View  key={item.mKey} style={styles.joexMsg}>
                    <View style={styles.roomEnter} key={item.mKey}>
                      <Text style={styles.roomEnterMsg}>{item.messege}</Text>
                    </View>
                  </View>
                )
              }
            }
          })
        }
        </ScrollView>   
        <View style={ styles.bottomView} >
        
                  <View style={styles.enterMsg}>
                    <TextInput style={styles.input}
                      underlineColorAndroid = "grey"
                     placeholder="Enter messege here"
                     placeholderTextColor="grey"
                     borderBottomColor="grey"
                     ref={input => { this.textInput = input }}
                     onSubmitEditing={this.sendMsg}
                     />
                    <TouchableOpacity onPress={this.sendMsg} style={styles.btnSend}><Text style={styles.btnTxt}>SEND</Text></TouchableOpacity>
                  </View>
 
        </View>  

        <View></View>        
      </KeyboardAwareScrollView>     
    );
  }
}
export default ChatScreen;
const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    margin: 10,
    backgroundColor: '#c9cccf',
    padding: 20,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    maxWidth: Dimensions.get('window').width / 1.5,
    alignSelf: 'flex-start',
  },
  joexMsg: {
    alignItems: 'center',
  },
  roomExit: {
    alignItems:'center',
    backgroundColor: '#ff757c',
    padding: 7,
    borderRadius:12,
    margin: 5,
    width: Dimensions.get('window').width - 140,
    justifyContent:'center'
  },
  roomEnter:{
     alignItems:'center',
     backgroundColor: '#94f7ba',
     padding: 7,
     borderRadius:12,
     margin: 5,
     width: Dimensions.get('window').width - 140,
     justifyContent:'center'
  },
  roomExitMsg: {
    fontWeight: 'bold'
  },
  roomEnterMsg:{
    fontWeight: 'bold'
  },
  welcomeSelf: {
    flex: 1,
    margin: 10,
    backgroundColor: '#c9cccf',
    padding: 20,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    maxWidth: Dimensions.get('window').width / 1.5,
    alignSelf: 'flex-end',
  },
  chatNameOth: {
    marginLeft: 3,
    textAlign:'left',
    color: 'red'
  },
  chatNameUsr: {
    marginRight: 3,
    textAlign:'right',
    color: 'green'
  },
  scroller: {
    height:Dimensions.get('window').height - 130,
  },
  bottomView:{
 
    width: '100%', 
    height: 50, 
    justifyContent: 'center', 
    
    position: 'relative',
    bottom: 0,
  },
  enterMsg: {
    flexDirection:'row'
  },
  input: {
    
    width: Dimensions.get('window').width - 80,
    textAlign: 'center'
   //  alignItems: 'center'
 },
 btnSend: {
   width: 80,
   justifyContent:'center',
   alignItems:'center'
 },
 btnTxt: {
   fontWeight: 'bold'
 },
 chatMsgOth: {
  marginLeft: 3,
  textAlign:'left',
  fontWeight:'bold'
 },
 chatMsgUsr: {
  marginRight: 3,
  textAlign:'right',
  fontWeight:'bold'
 }
});