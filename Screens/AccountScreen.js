import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../Context/AuthContext";
import styles from "../assets/style";
const _ = require("lodash");
import { Button, Input, Divider, Card } from "react-native-elements";

const AccountScreen = ({ navigation }) => {
  const { state, logout } = useContext(AuthContext);

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
      <Text style={styles.text}>
        Hi!{"\n"}
        {state.username}
      </Text>
      <Divider style={styles.divider} />

      <Button
        title="logout"
        type="solid"
        buttonStyle={[styles.button, { alignSelf: "center" }]}
        titleStyle={styles.buttonTitleStyle}
        onPress={logout}
      />
    </View>
  );
};

export default AccountScreen;
