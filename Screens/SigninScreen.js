import React, { useState, useContext } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Button, Input, Divider, Image } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { Context as AuthContext } from "../Context/AuthContext";
import styles from "../assets/style";
import LoginForm from "../components/LoginForm";
const validator = require("validator");

const SigninScreen = ({ navigation }) => {
  const { signin, signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [username, setUsername] = useState("");

  // [enter_email,login,create_account]
  const [loginFlow, setLoginFlow] = useState("enter_email");

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

  const _loginFlow = () => {
    switch (loginFlow) {
      case "enter_email":
        return (
          <LoginForm
            text="welcome"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            title="next"
            onPress={() => _login(email, password)}
          />
        );
      case "login":
        return (
          <LoginForm
            text="Hi User!"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            title="login"
            onPress={() => _login(email, password)}
            password={true}
          />
        );
      case "create_account":
        return (
          <>
            <LoginForm
              text="Oops! You don't have an account"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              password={true}
              title="create an account"
              onPress={_create_account}
              showUsernameField={true}
              username={username}
              setUsername={setUsername}
            />
          </>
        );
      default:
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              height: 310,
            }}
          >
            <ActivityIndicator size="large" color="#7041EE" />
          </View>
        );
    }
  };

  const _login = (email, password) => {
    setErrMessage(null);
    setLoginFlow(null);

    if (validator.isEmail(email)) {
      signin(email, password).catch((e) => {
        //setLoginFlow [enter_email,login,create_account]
        if (e == "invalid password") {
          setLoginFlow("login");
        } else if (e == "invalid email") {
          setLoginFlow("create_account");
        }
      });
    } else {
      setLoginFlow("enter_email");
      setErrMessage("invalid email");
    }
  };

  const _create_account = () => {
    setErrMessage(null);
    setLoginFlow(null);
    signup(username, email, password).catch((e) => {
      setErrMessage(e);
      setLoginFlow("enter_email");
    });
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#7041EE" />;
  } else {
    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={{ flex: 1 }}></View>

        <View style={{ flex: 9, alignItems: "center" }}>
          <Image source={image} style={{ width: 200, height: 200 }} />
          {_loginFlow()}
          {errMessage ? (
            <Text style={styles.errMessage}>{errMessage}</Text>
          ) : null}

          <Divider style={styles.divider} />
          {loginFlow == "create_account" || loginFlow == "login" ? (
            <TouchableOpacity onPress={() => setLoginFlow("enter_email")}>
              <Text style={[styles.subText, { color: "#7041EE" }]}>
                use a different email
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
};

export default SigninScreen;
