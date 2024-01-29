import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';

function App(): React.JSX.Element {
  // State to store the user's input
  const [userInput, setUserInput] = useState('');
  
  // Function to handle the submission
  const handleSubmit = () => {
    // Show an alert with the user's input
    Alert.alert('Submitted', `Your input: ${userInput}`);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.appName}>RateMyCourse at </Text>
        <Image 
          source={require('./src/GeorgiaTech_RGB.png')} 
          style={styles.logo}
        />
      </View>
      <View>
        <Text style={styles.label}>Enter your comment on:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserInput}
          value={userInput}
          placeholder="Type here"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  logo: {
    width: 150, 
    height: 35,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#003057",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: "#FFFFFF"
  },
});

export default App;

