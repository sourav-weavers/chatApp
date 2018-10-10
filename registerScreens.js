import { Navigation } from 'react-native-navigation';
import LandingScreen from './screens/login';
import ChatroomSt from './screens/chatroomStatefull';
import AddRoomScreen from './screens/addRoomScreen';
import ChatScreen from './screens/chatScreen';

export default () =>{
  Navigation.registerComponent('LandingScreen',() => LandingScreen);
  Navigation.registerComponent('ChatRoomsScreen', () => ChatroomSt);
  Navigation.registerComponent('addRoomScreen', () => AddRoomScreen);
  Navigation.registerComponent('ChatScreen', () => ChatScreen);
  Navigation.startSingleScreenApp({
    screen: {
      screen : 'LandingScreen',
      title: 'Login'
    }
  });
}