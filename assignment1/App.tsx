import React, { useState } from 'react';
import {
  Alert,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LogoComponent></LogoComponent>
        <PickerComponent></PickerComponent>
        <TextInputComponent></TextInputComponent>
        <ContentScrollViewComponent></ContentScrollViewComponent>
      </View>
    </SafeAreaView>
  );
}

// Logo
const LogoComponent = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>RateMyCourse at </Text>
      <Image
        source={require('./src/GeorgiaTech_RGB.png')}
        style={styles.logo}
      />
    </View>
  )
};
//

// Picker
const PickerComponent = () => {
  // Use useState hook for state management in functional component
  const [selectedCourse, setSelectedCourse] = useState('');

  return (
    <View>
      <Text>Select course to rate:</Text>
      <View style={styles.pickerComp}>
        <Picker
          style={styles.picker}
          selectedValue={selectedCourse}
          onValueChange={(value, index) => setSelectedCourse(value)}
        >
          <Picker.Item label='Course Number' value=""/>
          <Picker.Item label='CS 1000' value="cs1000"/>
          <Picker.Item label='CS 1100' value="cs1100"/>
          <Picker.Item label='CS 1200' value="cs1200"/>
          <Picker.Item label='CS 1300' value="cs1300"/>
          <Picker.Item label='CS 1400' value="cs1400"/>
          <Picker.Item label='CS 1500' value="cs1500"/>
          <Picker.Item label='CS 1600' value="cs1600"/>
          <Picker.Item label='CS 1700' value="cs1700"/>
          <Picker.Item label='CS 1800' value="cs1800"/>
          <Picker.Item label='CS 1900' value="cs1900"/>
          <Picker.Item label='CS 2000' value="cs2000"/>
          <Picker.Item label='CS 2100' value="cs2100"/>
        </Picker>
      </View>
    </View>
  );
}; 

// Text Input
const TextInputComponent = () => {
  // State to store the user's input
  const [userInput, setUserInput] = useState('');

  // Function to handle the submission
  const handleSubmit = () => {
    // Show an alert with the user's input
    Alert.alert('Submitted', `Your input: ${userInput}`);
  };

  return (
    <View>
      <Text style={styles.label}>Enter your comment on:
    </Text>
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
  )
};
//


// scroll view
type ContentBoxProps = {
  course: string;
  body: string;
};

const ContentBox = (props: ContentBoxProps) => {
  return (
    <View style={styles_scrollview.contentBox}>
      <Text style={styles_scrollview.course}>Course: {props.course}</Text>
      <Text style={styles_scrollview.body}>{props.body}</Text>
    </View>
  )
};

const ContentScrollViewComponent = () => {
  const contentData = [
    { course: "CS 1000", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1200", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1300", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1400", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1500", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1600", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1700", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1800", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 1900", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 2000", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { course: "CS 2100", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
  ]

  return (
    <ScrollView style={styles_scrollview.scrollView}>
      {contentData.map((data, index) => (
        <ContentBox key={index} course={data.course} body={data.body}></ContentBox>
      ))}
    </ScrollView>
  );
};
//


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
  pickerComp: {
    marginTop: 10,
  },
  picker: {
    width: '53%',
  },
});

const styles_scrollview = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contentBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  course: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
  },
});

export default App;

