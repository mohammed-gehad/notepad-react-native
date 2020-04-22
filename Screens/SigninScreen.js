import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Divider, Image } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { Context as AuthContext } from "../Context/AuthContext";
import styles from "../assets/style";

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  let [fontsLoaded] = useFonts({
    CircularStdBlack: require("../assets/Fonts/CircularStd-Black.ttf"),
    CircularStdBold: require("../assets/Fonts/CircularStd-Bold.ttf"),
    CircularStdBook: require("../assets/Fonts/CircularStd-Book.ttf"),
    CircularStd: require("../assets/Fonts/CircularStd.ttf"),
  });

  const image = require("../assets/Frame.png");
  //event clears error message when navigate to another screen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setErrMessage(null);
    });

    return unsubscribe;
  }, [navigation]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#7041EE" />;
  } else {
    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={{ flex: 1 }}></View>

        <View style={{ flex: 9, alignItems: "center" }}>
          <Image source={image} style={{ width: 200, height: 200 }} />
          <Text style={[styles.text, { color: "#7041EE" }]}>Sign in</Text>
          <Divider style={styles.divider} />

          <Input
            placeholder="Email"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Divider style={styles.divider} />
          <Input
            placeholder="Password"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <Divider style={styles.divider} />

          <Button
            title="Sign in"
            type="solid"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitleStyle}
            onPress={() => {
              signin(email, password)
                .then(setErrMessage(null))
                .catch((e) => setErrMessage(e));
            }}
          />
          <Divider style={styles.divider} />

          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.subText}>
              New around here?{" "}
              <Text style={{ color: "#7041EE" }}>create an account</Text>
            </Text>
          </TouchableOpacity>

          {errMessage ? (
            <Text style={styles.errMessage}>{errMessage}</Text>
          ) : null}
        </View>
      </View>
    );
  }
};

// const styles = StyleSheet.create({

// });
export default SigninScreen;
