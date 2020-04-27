import React, { useContext, useState } from "react";
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
              addNote(title, content).then((data) => {
                setIsLoading(false);
                setTitle("");
                setContent("");
                navigation.navigate("note", { id: data._id });
              });
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
