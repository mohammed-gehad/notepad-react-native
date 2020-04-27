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
  Share,
} from "react-native";
import { Button, Input, Divider, ListItem, Image } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { Context as AuthContext } from "../Context/AuthContext";
import styles from "../assets/style";
import { Context as NoteContext } from "../Context/NoteContext";
const _ = require("lodash");
const moment = require("moment");
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign, Feather } from "@expo/vector-icons";

const NoteListScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    CircularStdBlack: require("../assets/Fonts/CircularStd-Black.ttf"),
    CircularStdBold: require("../assets/Fonts/CircularStd-Bold.ttf"),
    CircularStdBook: require("../assets/Fonts/CircularStd-Book.ttf"),
    CircularStd: require("../assets/Fonts/CircularStd.ttf"),
  });
  const image = require("../assets/Frame.png");

  const { state, getNotes, deleteNote, saveData, getData } = useContext(
    NoteContext
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      getNotes.then(() => {
        setIsLoading(false);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const renderHiddenItem = (data) => {
    onShare = async () => {
      try {
        const result = await Share.share({
          message: `${data.item.title}\n${data.item.content}`,
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}
      >
        <Feather
          name="send"
          size={27}
          style={{ alignSelf: "center", paddingBottom: 10, margin: 5 }}
          onPress={onShare}
        />
        <Feather
          name="edit-2"
          onPress={() => {
            navigation.navigate("updateNote", { id: data.item._id });
          }}
          size={27}
          style={{ alignSelf: "center", paddingBottom: 10, margin: 5 }}
        />
        <AntDesign
          onPress={() => {
            //console.log(data.item._id);
            deleteNote({ _id: data.item._id });
          }}
          name="delete"
          size={27}
          style={{ alignSelf: "center", paddingBottom: 10, margin: 5 }}
        />
      </View>
    );
  };
  const renderItem = (data) => {
    return (
      <View>
        <ListItem
          chevron
          rightTitle={moment(data.item.date).fromNow()}
          rightTitleStyle={{ fontSize: 12 }}
          title={_.truncate(data.item.title, { length: 20 })}
          subtitle={_.truncate(data.item.content, { length: 24 })}
          containerStyle={{
            height: 60,
            backgroundColor: "#FAFBFD",
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
            navigation.navigate("note", { id: data.item._id });
          }}
        />

        <Divider style={styles.divider} />
      </View>
    );
  };

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
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Image source={image} style={{ width: 50, height: 50 }} />
          </View>
          <Text
            style={[
              styles.text,
              {
                color: "#7041EE",
                flex: 6,
                textAlignVertical: "center",
                paddingBottom: 8,
              },
            ]}
          >
            notes
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <SwipeListView
            onRefresh={() => {
              setIsLoading(true);
              getNotes.then(() => {
                setIsLoading(false);
              });
            }}
            refreshing={isLoading}
            keyExtractor={(item, index) => index.toString()}
            data={state}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-120}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </View>
      </View>
    );
  }
};

export default NoteListScreen;
