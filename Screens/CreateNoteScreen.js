import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Context as NoteContext } from "../Context/NoteContext";
import styles from "../assets/style";
const _ = require("lodash");
import { Input, Divider } from "react-native-elements";
import { SelectColor, Header } from "../components";

const CreateNoteScreen = ({ navigation }) => {
  const { state, addNote } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#7041EE");

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (title || content) {
        addNote(title, content, color).then((data) => {
          setTitle("");
          setContent("");
        });
      }
    });

    return unsubscribe;
  }, [navigation, title, content]);

  return (
    <>
      <Header
        backgroundColor="#FAFBFD"
        onPress={() => {
          navigation.navigate("noteList");
        }}
      />

      <View
        style={{
          backgroundColor: "#FAFBFD",
          paddingHorizontal: 10,
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <SelectColor setColor={setColor} />
        </View>
        <Divider style={styles.divider} />
        <Input
          placeholder="Title"
          containerStyle={[styles.input, { width: null }]}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={[styles.inputStyle, { color }]}
          value={title}
          onChangeText={setTitle}
        />
        <Divider style={styles.divider} />

        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            borderRadius: 18,
            padding: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input
              placeholder="content"
              inputContainerStyle={[{ borderBottomWidth: 0 }]}
              inputStyle={[styles.inputStyle]}
              value={content}
              onChangeText={setContent}
              multiline
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateNoteScreen;
