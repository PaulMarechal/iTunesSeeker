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

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {
          maxRating.map((item, key) => {
          return(
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
                <Image 
                  style={styles.starImgStyle}
                  source={item <= defaultRating ? {uri: starImgFilled} : {uri: starImgCorner}}
                />
              </TouchableOpacity>
          )
        })
        }
      </View>
    )
  }

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

  // const openPopup = id => {
  //   axios("https://itunes.apple.com/search?id="+ "1057314102" + "&entity=song&media=music").then(({ data }) => {
  //     let result = data;
  //     console.log(https://itunes.apple.com/search?id=105731410&entity=song&media=music");
  //     setState(prevState => {
  //       return { ...prevState, selected: result }
  //     });
  //   });
  // }

  useEffect(() => {
    if (notif) {
      navigation.setOptions({ tabBarBadge: notif });
    } else {
      navigation.setOptions({ tabBarBadge: null });
    }
  }, [notif]);

  return (
    //  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //    <Text style={{ fontSize: 32 }}>Home Screen</Text> 
    //    <Button
    //     title="go to settings"
    //     onPress={() => {
    //       navigation.navigate("Settings", {
    //         number: Math.ceil(Math.random() * 1000),
    //       });
    //     }}
    //   /> 

    //   {/* Bouton increment */}>
    //    <Button
    //     title="increment"
    //     onPress={() => {
    //       setNotif((current) => current + 1);
    //     }}
    //   /> 
    // </View>


    <View style={styles.container}>
      {/* <Text style={styles.titre}>Cinémathèque</Text> */}
      <TextInput 
        style={styles.searchBar} 
        placeholder="rechercher un film"
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

              {/* <ReactAudioPlayer src={result.collectionViewUrl} autoPlay controls /> */}
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      
      {/* <Modal animationType="slide" transparent={false} visible={(typeof state.selected.collectionName != "undefined") ? true : false}>
        <View style={styles.modal}>
          
          <TouchableHighlight underlayColor='#fff' onPress={() => setState(prevState => {
            return { ...prevState, selected: {} } })} >
            <View style={styles.styleButtonRetour}>
              <Text style={styles.retour}>◀ Retour</Text>
            </View>
        </TouchableHighlight>

          <Text style={styles.modalTitle}>{state.selected.artistName}</Text>
          <View style={styles.modalInfo}>
            <Text style={styles.modalText}>🎬 Artiste : {"\n"}{state.selected.artistName}</Text>
            <Text style={styles.modalText}>📅 Year : {state.selected.releaseDate}</Text>
            <Text style={styles.modalText}>🏆 Prix : {"\n"}{state.selected.collectionPrice}</Text>
            <Text style={styles.modalText}>📓 Plot : {"\n"}{state.selected.previewUrl}</Text>
            <Text style={styles.modalText}>🖥 Website : {state.selected.trackViewUrl}</Text>
          </View>

          <View style={styles.modalInfo}>
            
            <CustomRatingBar/>
            <Text style={styles.modalTextRating}>
              {defaultRating + ' / ' + maxRating.length}
            </Text>
          </View>

        </View>
      </Modal> */}
    </View>
  );
};
const SettingsScreen = ({ route, navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({ title: "Updated" });
    }, 1000);
  }, []);

  const [notif, setNotif] = useState(0);
  const apiurl = "https://itunes.apple.com/search?entity=song&term="

    const starImgFilled = 'https://paulmarechal.xyz/assets/images/star_filled.png'
  const starImgCorner = 'https://paulmarechal.xyz/assets/images/star_corner.png'

  const [defaultRating, setDefaultRating] = useState(2)
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {
          maxRating.map((item, key) => {
          return(
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
                <Image 
                  style={styles.starImgStyle}
                  source={item <= defaultRating ? {uri: starImgFilled} : {uri: starImgCorner}}
                />
              </TouchableOpacity>
          )
        })
        }
      </View>
    )
  }

  const { number } = route.params;
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text style={{ fontSize: 32 }}>Settings Screen</Text>
    //   <Text style={{ fontSize: 24 }}>number : {number}</Text>
    // </View>
    <View>
    <Text style={styles.modalText}>Ajouter un film</Text>
    <TextInput 
        style={styles.searchBar} 
        placeholder="titre du film"
        
    />
    <TextInput 
        style={styles.searchBar} 
        placeholder="Réalisateur"
        
    />
    <TextInput 
        style={styles.searchBar} 
        placeholder="Année"
        
    />
    <TextInput 
        style={styles.searchBar} 
        placeholder="Résumé"
    />
    <CustomRatingBar/>
            <Text style={styles.modalTextRating}>
              {defaultRating + ' / ' + maxRating.length}
            </Text>
    </View>

  );
};

// const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Film"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name == "Film") {
              iconName = focused ? "film" : "film-outline";
            } else if (route.name == "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tabs.Screen name="Film" component={HomeScreen} />
        <Tabs.Screen
          name="Settings"
          component={SettingsScreen}
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
