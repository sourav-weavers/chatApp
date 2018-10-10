import React from 'react';
import { View, Text, TextInput, StyleSheet,Dimensions } from 'react-native';

export default InputBox = (props) => {
  return(
    <View>
      <View style={styles.container}>
        <TextInput style={styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = {props.fiedPlcHldr}
                  placeholderTextColor = "#000000"
                  autoCapitalize = "none"
                  onChangeText={(text) => {props.handletext(text,props.fiedName)}}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
     alignItems: 'center'
  },
  input: {
     margin: 8,
     height: 56,
     borderColor: '#f79400',
     borderWidth: 2,
     width: Dimensions.get('window').width - 50,
     borderRadius: 12,
     textAlign: 'center'
    //  alignItems: 'center'
  },
  
});