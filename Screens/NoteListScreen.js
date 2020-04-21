import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Button, Input, Divider, ListItem } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { Context as AuthContext } from "../Context/AuthContext";
import styles from "../assets/style";
import { Context as NoteContext } from "../Context/NoteContext";
const _ =require('lodash')


const NoteListScreen = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    CircularStdBlack: require("../assets/Fonts/CircularStd-Black.ttf"),
    CircularStdBold: require("../assets/Fonts/CircularStd-Bold.ttf"),
    CircularStdBook: require("../assets/Fonts/CircularStd-Book.ttf"),
    CircularStd: require("../assets/Fonts/CircularStd.ttf"),
  });

  const { state, getNotes } = useContext(NoteContext);



    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
           getNotes();
      });
  
      return unsubscribe;
    }, [navigation]);
  
 

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#7041EE" />;
  } else {
    return (
      <View
        style={[
          {
            backgroundColor: "#FAFBFD",

            paddingTop: 40,
            paddingHorizontal: 10,
            flex:1,
            flexDirection:'column'
          },
        ]}
      >
        <Text style={[styles.text, {color:'#7041EE',paddingLeft:14}]}>notes</Text>
        <View style={{flex:1}}>
          <FlatList
            style={{}}
            data={state}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View>
                  <ListItem
                    chevron
                    title={item.title}
                    subtitle={item.content}
                    containerStyle={{
                      height: 60,
                      backgroundColor: "transparent",
                      borderLeftWidth: 3,
                      borderColor: "#6D3FE6",
                    }}
                    titleStyle={{
                      color: "#6D3FE6",
                      fontFamily: "CircularStd",
                      fontSize: 18,
                    }}
                    subtitleStyle={{
                        color: "#2C2929",
                      fontFamily: "CircularStd",
                      fontSize: 14,
                    }}
                    onPress={()=>{
                        navigation.navigate('note',{id:item._id})
                    }}
                  />

                  <Divider style={styles.divider} />
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
};

export default NoteListScreen;
