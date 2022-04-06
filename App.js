import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, ScrollView, Image, TouchableHighlight, Modal, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

const HomeScreen = ({ navigation }) => {
  const [notif, setNotif] = useState(0);
  const apiurl = "https://itunes.apple.com/search"

  

  const [defaultRating, setDefaultRating] = useState(2)
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])

  const starImgFilled = 'https://paulmarechal.xyz/assets/images/star_filled.png'
  const starImgCorner = 'https://paulmarechal.xyz/assets/images/star_corner.png'

  const [state, setState] = useState({
    s:"", 
    results: [], 
    selected: {}
  });

  const search = () => {
    axios("https://itunes.apple.com/search?entity=album&term=" + state.s).then( ({data}) => {
      let results = data.results;
      console.log("result :", results)
      // console.log("state.s : ", data)
      setState(prevState => {
        return { ...prevState, results: results}
      })
    })
  }

  useEffect(() => {
    if (notif) {
      navigation.setOptions({ tabBarBadge: notif });
    } else {
      navigation.setOptions({ tabBarBadge: null });
    }
  }, [notif]);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search music or artist"
        onChangeText={text => setState(prevState => {
        return { ...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s} 
      />
      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight underlayColor='#f1f1f1' style={styles.resultFilm} key={result.imdbID}  >
            <View key={result.imdbID} style={styles.result}>
              <Image style={styles.poster} source={{uri: result.artworkUrl100}} resizeMode="cover"/>
              <Text style={styles.headingTitre}>{result.artistName}</Text>
              <Text style={styles.heading}>{result.collectionName}</Text>
              <Text style={styles.heading}>{result.collectionPrice} €</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
};
const LikedScreen = ({ route, navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({ title: "Liked" });
    }, 1000);
  }, []);

  const [notif, setNotif] = useState(0);
  const apiurl = "https://itunes.apple.com/search?entity=song&term="

    const starImgFilled = 'https://paulmarechal.xyz/assets/images/star_filled.png'
  const starImgCorner = 'https://paulmarechal.xyz/assets/images/star_corner.png'

  const [defaultRating, setDefaultRating] = useState(2)
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])

  const { number } = route.params;
  return (
    <View>
      {/* <Text style={styles.modalText}>Liked</Text> */}
    </View>

  );
};

// const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Music"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name == "Music") {
              iconName = focused ? "musical-notes" : "musical-notes-outline";
            } else if (route.name == "Liked") {
              iconName = focused ? "flag" : "flag-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tabs.Screen name="Music" component={HomeScreen} />
        <Tabs.Screen
          name="Liked"
          component={LikedScreen}
          initialParams={{ number: 0 }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  titre: {
    fontSize: 32,
    fontWeight: '200', 
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  searchBar: {
    fontSize: 20,
    fontWeight: '100',
    paddingRight: 10, 
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    marginBottom: 40,
    marginTop: 15
  },
  result: {
    flex: 1, 
    marginBottom: 15, 
    width: '100%', 

  }, 
  results: {
    flex: 1,
    borderRadius: 8,
    width: '100%',
    height: '100%'
  }, 
  heading: {
    color: '#000',
    fontSize: 23, 
    fontWeight: '200', 
    padding: 20, 
    backgroundColor: '#f1f1f1',
    // textAlign: 'center', 
    borderRadius: 8, 
    paddingBottom: 5
  }, 

  headingTitre: {
    color: '#000',
    fontSize: 23, 
    fontWeight: '300', 
    padding: 20, 
    backgroundColor: '#f1f1f1',
    textAlign: 'center', 
    borderRadius: 8, 
    paddingBottom: 5
  }, 


  poster: {
    width: 338, 
    height: 338, 
    borderRadius: 8, 
  }, 
  modal: {
    marginTop: 70,
    padding: 20
  }, 
  modalTitle: {
    textAlign: 'center',
    fontWeight: '200', 
    fontSize: 32
  },
  modalInfo: {
    marginTop: 20,
    backgroundColor: '#F5f5f5', 
    textAlign: 'center',
    fontSize: 20, 
    fontWeight: '100',
    padding: 20, 
    borderRadius: 7
  },
  modalText: {
    fontWeight: '200',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 15,
  }, 

  retour: {
    height: 20, 
    width: 60,
    backgroundColor: 'transparent',
  }, 

  styleButton: {
    backgroundColor: '#FFF',
    marginBottom: 10
  },

  styleButtonRetour: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: -30
  },

  resultFilm: {
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f1f1f1', 
    width: '100%'
  }, 

  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  }, 

  starImgStyle: {
    width: 40, 
    height: 40, 
    resizeMode: 'cover'
  }, 

  buttonStyle: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 30, 
    backgroundColor: 'green'
  }, 

  modalTextRating: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 17,
    marginTop: 15,
  }

});



export default App;
