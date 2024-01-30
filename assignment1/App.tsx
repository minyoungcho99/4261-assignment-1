import React, { useState, useEffect, FC } from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

interface PickerComponentProps {
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
}

interface TextInputComponentProps {
  userInput: string;
  setUserInput: (input: string) => void;
}

function App() {
  // State for the selected course and user input
  const [selectedCourse, setSelectedCourse] = useState('');
  const [userInput, setUserInput] = useState('');

  // Function to handle the submission
  const handleSubmit = async () => {
    // Validate input
    if (!selectedCourse || !userInput) {
      Alert.alert('Error', 'Please select a course and enter your rating.')
      return;
    }

    // Add data to Firestore
    try {
      await firestore()
        .collection('ratings')
        .add({
          course: selectedCourse,
          comment: userInput,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      Alert.alert('Success', 'Your rating has been submitted.');
      // Reset the state
      setSelectedCourse('');
      setUserInput('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was a problem submitting your rating.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LogoComponent />
        <PickerComponent selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
        <TextInputComponent userInput={userInput} setUserInput={setUserInput} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <ContentScrollViewComponent />
      </View>
    </SafeAreaView>
  );
}

// Logo
const LogoComponent = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>    RateMyCourse at </Text>
      <Image
        source={require('./src/GeorgiaTech_RGB.png')}
        style={styles.logo}
      />
    </View>
  )
};
//

// Picker
const PickerComponent: FC<PickerComponentProps> = ({ selectedCourse, setSelectedCourse }) => {
  return (
    <View style={styles.pickerComp}>
      <Text>Select course to rate:</Text>
      <View>
        <Picker
          style={styles.picker}
          selectedValue={selectedCourse}
          onValueChange={(value, index) => setSelectedCourse(value)}
        >
          <Picker.Item label='Course Number' value="" />
          <Picker.Item label='CS 1000' value="cs1000" />
          <Picker.Item label='CS 1100' value="cs1100" />
          <Picker.Item label='CS 1200' value="cs1200" />
          <Picker.Item label='CS 1300' value="cs1300" />
          <Picker.Item label='CS 1400' value="cs1400" />
          <Picker.Item label='CS 1500' value="cs1500" />
          <Picker.Item label='CS 1600' value="cs1600" />
          <Picker.Item label='CS 1700' value="cs1700" />
          <Picker.Item label='CS 1800' value="cs1800" />
          <Picker.Item label='CS 1900' value="cs1900" />
          <Picker.Item label='CS 2000' value="cs2000" />
          <Picker.Item label='CS 2100' value="cs2100" />
        </Picker>
      </View>
    </View>
  );
};

// Text Input
const TextInputComponent: FC<TextInputComponentProps> = ({ userInput, setUserInput }) => {
  return (
    <View>
      <Text style={styles.label}>Enter your comment on:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserInput}
        value={userInput}
        placeholder="Type here"
      />
    </View>
  )
};
//

// scroll view
type ContentType = {
  comment: string;
  course: string;
  // rating: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
    toDate(): Date;
  };
}

const ContentBox = (props: ContentType) => {
  return (
    <View style={styles_scrollview.contentBox}>
      <Text style={styles_scrollview.course}>Course: {props.course}</Text>
      {/* <Text style={styles_scrollview.rating}>rating: {props.rating}</Text> */}
      <Text style={styles_scrollview.body}>{props.comment}</Text>
      <Text style={styles_scrollview.timestamp}>{props.timestamp.toDate().toString()}</Text>
    </View>
  )
};

const ContentScrollViewComponent = () => {
  const [contentData, setContentData] = useState<Array<ContentType>>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const snapshot = await firestore().collection('ratings').get();
      const data = snapshot.docs.map(doc => doc.data() as ContentType)
      setContentData(data);
      console.log('Data from Firestore:', data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // if scroll down, fetch data
  const onScroll = async (event: any) => {
    if (event.nativeEvent.contentOffset.y <= 0) {
      setRefreshing(true);
      try {
        await fetchData();
      } catch (error) {
        console.error('Error refreshing data: ', error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  return (
    <ScrollView
      style={styles_scrollview.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
      onScroll={onScroll}
      scrollEventThrottle={400}>

      {contentData.map((data, index) => (
        <ContentBox
          key={index} course={data.course} comment={data.comment}
          timestamp={data.timestamp}></ContentBox>
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
    marginTop: 40,
  },
  picker: {
    width: '53%',
  },
});

const styles_scrollview = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 20
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    textAlign: 'right',
  },
  timestamp: {
    textAlign: 'left',
    fontSize: 10,
  },
  body: {
    fontSize: 16,
  },
});

export default App;
