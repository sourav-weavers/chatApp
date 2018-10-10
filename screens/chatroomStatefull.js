import React , {Component} from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import { navigator_style } from './../navigatorStyle';
import { Navigation } from 'react-native-navigation';
export default class ChatroomSt extends Component {
  static navigatorStyle = navigator_style;
  static navigatorButtons = {
    rightButtons : [
      {
        icon : require('../images/add.png'),
        id: 'addRoom'
      }
    ]
  }
  state = {
    chatRooms: [],
    animating: true
  };
 constructor(props){
   super(props);
  //  console.log('in constructor');
   this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
   this.loadData();
 }
 onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
  //console.log(event);
  if (event.type == 'ScreenChangedEvent'){
    this.loadData();
  }
  else if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
    if (event.id == 'addRoom') { // this is the same id field from the static navigatorButtons definition
      this.props.navigator.showModal({
        screen: "addRoomScreen",
        title: 'Add Room',
        //passProps: {fetchagain : () => console.log('fetchn')},
        navigatorStyle: {screenBackgroundColor: 'white'}, 
        animationType: "slide-up",
      });
    }
  }
}
 enterRoom(key,name) {
   AsyncStorage.getItem('username').then(data=>{
    firebase.database().ref('chatrooms').child(key).child('chats').push({
      messege: `${data} has joined this room`,
      sendDate: new Date().getTime(),
      type: 'join',
      user: data
    }).then(()=>{
        this.props.navigator.push({
          screen: 'ChatScreen',
          title: name,
          passProps: { roomKey: key },
          backButtonHidden: true,
        });
    })
   })
 }
  loadData = () =>{
   //console.log('here');
    let _chatroom = [];
    firebase.database().ref('chatrooms').once('value',chatrooms=>{
      // console.log(chatrooms.val());
      if(chatrooms.val()){
        chatrooms.forEach(chatroom=>{
          _chatroom.push({roomKey:chatroom.key, roomValue:chatroom.val().roomname,icon: 'chat'});
        })
      }
    }).then(()=>{
      // console.log(_chatroom);
      this.setState({chatRooms: _chatroom,animating:false});
    })
  }
  render(){
    const animating = this.state.animating
    return(
      <View>
      {animating && (
          <ActivityIndicator
            style={{ height: Dimensions.get('window').height }}
            color="#f79400"
            size="large"
          />
        )}
      <List containerStyle={{marginTop: 2,borderTopColor: '#f79400',borderTopWidth: 2}}>
        { 
          this.state.chatRooms.map((item) => (
            <ListItem titleContainerStyle={{marginLeft: 15, padding: 0, margin: 0}} containerStyle={{borderBottomColor: '#f79400',borderBottomWidth: 2}}
              key={item.roomKey}
              title={item.roomValue}
              leftIcon ={{name:item.icon}}
              onPress = {() => this.enterRoom(item.roomKey,item.roomValue)}
            />
          ))
        }
        </List>

        {/* <Text style={{fontSize: 32}}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Text> */}
        </View>
      
    );
  }
}
const styles = StyleSheet.create({
  
})