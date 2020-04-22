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
import { Button, Input, Divider, ListItem,Image } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { Context as AuthContext } from "../Context/AuthContext";
import styles from "../assets/style";
import { Context as NoteContext } from "../Context/NoteContext";
const _ = require("lodash");
const moment = require("moment");

const NoteListScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    CircularStdBlack: require("../assets/Fonts/CircularStd-Black.ttf"),
    CircularStdBold: require("../assets/Fonts/CircularStd-Bold.ttf"),
    CircularStdBook: require("../assets/Fonts/CircularStd-Book.ttf"),
    CircularStd: require("../assets/Fonts/CircularStd.ttf"),
  });
  const image = require("../assets/Frame.png");

  const { state, getNotes } = useContext(NoteContext);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotes(setIsLoading);
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
            flex: 1,
            flexDirection: "column",
          },
        ]}
      >
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:1,justifyContent:'center'}}><Image source={image} style={{ width: 50, height: 50}} /></View>
          <Text style={[styles.text, { color: "#7041EE", flex:6,textAlignVertical:'center' ,paddingBottom:8}]}>
            notes
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <FlatList
            refreshing={isLoading}
            onRefresh={() => {
              getNotes(setIsLoading);
            }}
            style={{}}
            data={state}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View>
                  <ListItem
                    chevron
                    rightTitle={moment(item.date).fromNow()}
                    rightTitleStyle={{ fontSize: 12 }}
                    title={_.truncate(item.title, { length: 20 })}
                    subtitle={_.truncate(item.content, { length: 24 })}
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
                    onPress={() => {
                      navigation.navigate("note", { id: item._id });
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
