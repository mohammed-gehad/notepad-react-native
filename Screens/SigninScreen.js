import React,{useState , useContext} from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity ,AsyncStorage } from "react-native";
import { Button, Input, Divider } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import {Context as AuthContext} from '../Context/AuthContext'
const SigninScreen = ({ navigation }) => {
    const {state , signin} = useContext(AuthContext)
    const [email , setEmail] = useState('Pu2k@hotmail.com')
    const [password , setPassword] = useState('Msamsamsa3')
    let [fontsLoaded] = useFonts({
        CircularStdBlack: require("../assets/Fonts/CircularStd-Black.ttf"),
        CircularStdBold: require("../assets/Fonts/CircularStd-Bold.ttf"),
        CircularStdBook: require("../assets/Fonts/CircularStd-Book.ttf"),
        CircularStd: require("../assets/Fonts/CircularStd.ttf"),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#7041EE" />;
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Sign in</Text>
                <Divider style={styles.divider} />

                <Input
                    placeholder="Email"
                    containerStyle={styles.input}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    value={email}
                    onChangeText={setEmail}
                />
                <Divider style={styles.divider} />
                <Input
                    placeholder="Password"
                    containerStyle={styles.input}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    value={password}
                    onChangeText={setPassword}
                />
                <Divider style={styles.divider} />


                <Button
                    title="Sign in"
                    type="solid"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitleStyle}
                    onPress={ ()=>{
                        signin(email,password)
                    }}
                />
                <Divider style={styles.divider} />

                <TouchableOpacity onPress={() => navigation.navigate('signup')}>

                    <Text style={styles.subText}>New around here?  <Text style={{ color: '#7041EE' }}>create an account</Text></Text>
                </TouchableOpacity>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FAFBFD",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderRadius: 24,
        backgroundColor: "#7041EE",

        width: 305,
        height: 58,

    },
    text: {
        fontFamily: "CircularStdBlack",
        color: "#2C2929",
        fontSize: 36,
    },
    subText: {
        fontFamily: "CircularStdBlack",
        color: "#2C2929",
        fontSize: 15,
    },
    input: {
        width: 305,
        height: 58,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        alignItems: "center",
        alignContent: "center",
        flex: 1,
    },
    inputStyle: {
        color: "#2C2929",
        fontFamily: "CircularStd",
        fontSize: 20,
    },
    divider: {
        height: 10,
        backgroundColor: "transparent",
    },
    buttonTitleStyle: {
        color: "#FFFFFF",
        fontFamily: "CircularStd",
        fontSize: 20,

    },

});
export default SigninScreen;
