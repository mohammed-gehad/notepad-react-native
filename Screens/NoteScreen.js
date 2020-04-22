import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Context as NoteContext } from "../Context/NoteContext";
import styles from "../assets/style";
const _ = require("lodash");
import { Button, Input, Divider, Card } from "react-native-elements";

const Note = ({ route,navigation }) => {
  const { id } = route.params;
  const { state, getNotes } = useContext(NoteContext);
  const note = _.find(state, { _id: id });
  return (
    <View
      style={{
        backgroundColor: "#FAFBFD",
        paddingTop: 40,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text
          style={[styles.text, { color: "#7041EE", paddingLeft: 14, flex: 3 }]}
        >
          {note.title}
        </Text>
        <Button
          title="update"
          type="solid"
          buttonStyle={[
            styles.button,
            { position: "absolute", top: 0, right: 0, zIndex: 1, width: 100 },
          ]}
          titleStyle={styles.buttonTitleStyle}
          onPress={() => {
              navigation.navigate("updateNote", { id });

          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 10,
          borderRadius: 18,
          padding: 10,
        }}
      >
        <Text style={[styles.subText, { fontSize: 18 }]}>{note.content}</Text>
      </View>
    </View>
  );
};

export default Note;
