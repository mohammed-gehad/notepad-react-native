import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Context as NoteContext } from "../Context/NoteContext";
import styles from "../assets/style";
const _ = require("lodash");
import { Button, Input, Divider, Card } from "react-native-elements";

const UpdateNoteScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { state, updateNote } = useContext(NoteContext);
  const note = _.find(state, { _id: id });
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionStart", () => {
      // do something
      updateNote(id, title, content);
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
      {title && content ? (
        !isLoading ? (
          <Button
            title="save"
            type="solid"
            buttonStyle={[
              styles.button,
              { position: "absolute", top: 0, right: 0, zIndex: 1, width: 100 },
            ]}
            titleStyle={styles.buttonTitleStyle}
            onPress={() => {
              setIsLoading(true);
              updateNote(id, title, content)
                .then((data) => {
                  setIsLoading(false);
                })
                .then(() => navigation.navigate("noteList"));
            }}
          />
        ) : (
          <ActivityIndicator
            size="large"
            style={{ position: "absolute", right: 50, top: 50 }}
          />
        )
      ) : null}

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
            containerStyle={[{}]}
            inputContainerStyle={[{ borderBottomWidth: 0 }]}
            inputStyle={[styles.inputStyle, {}]}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
      </View>
    </View>
  );
};

export default UpdateNoteScreen;
