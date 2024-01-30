import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LogoComponent></LogoComponent>
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
type ContentType = {
  comment: string;
  courseNum: string;
  rating: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
    toDate(): Date;
  };
}

const ContentBox = (props: ContentType) => {
  return (
    <View style={styles_scrollview.contentBox}>
      <Text style={styles_scrollview.course}>Course: {props.courseNum}</Text>
      <Text style={styles_scrollview.rating}>rating: {props.rating}</Text>
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
          key={index} courseNum={data.courseNum} comment={data.comment}
          rating={data.rating} timestamp={data.timestamp}></ContentBox>
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

