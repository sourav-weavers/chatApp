import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default SubmitBtn = (props) => {
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.submitButton} onPress={props.checkUsr}>
          <Text style={styles.submitButtonText}>{props.submitText.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    )
}





const styles = StyleSheet.create({
  container: {
     alignItems: 'center'
  },
  submitButton: {
     backgroundColor: '#f79400',
     padding: 10,
     margin: 10,
     height: 50,
     borderRadius: 12,
     width: Dimensions.get('window').width - 350,
    alignItems:'center',
    justifyContent:'center'
  },
  submitButtonText:{
     color: 'white',
     fontWeight: 'bold',
     
    //  textTransform: 'uppercase'
  },
  
});