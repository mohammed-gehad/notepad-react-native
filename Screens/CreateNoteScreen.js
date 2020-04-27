import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Context as NoteContext } from "../Context/NoteContext";
import styles from "../assets/style";
const _ = require("lodash");
import { Button, Input, Divider, Card } from "react-native-elements";

const CreateNoteScreen = ({ navigation }) => {
  const { state, addNote } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // do something
      if (title && content) {
        addNote(title, content).then((data) => {
          setTitle("");
          setContent("");
        });
      }
    });

    return unsubscribe;
  }, [navigation, title, content]);

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
      <Input
        placeholder="Title"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={[styles.inputStyle, { color: "#7041EE" }]}
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
  );
};

export default CreateNoteScreen;
