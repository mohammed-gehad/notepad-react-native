import React,{useState , useContext} from "react";
import { View, Text, StyleSheet, ActivityIndicator,TouchableOpacity } from "react-native";
import { Button, Input, Divider } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import {Context as AuthContext} from '../Context/AuthContext'

const SigninScreen = ({navigation}) => {
    const {state , signup }= useContext(AuthContext)
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [username , setUsername] = useState('')

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
                <Text style={styles.text}>Sign Up</Text>
                <Divider style={styles.divider} />

                <Input
                    placeholder="Name"
                    containerStyle={[styles.input]}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    value={username}
                    onChangeText={setUsername}
                />
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
                    title="Sign Up"
                    type="solid"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitleStyle}
                    onPress={async ()=>{
                        signup(username,email,password)
                        console.log(state)

                    }}
                />
                <Divider style={styles.divider} />

                <TouchableOpacity onPress={()=>navigation.navigate('signin')}>
                <Text style={styles.subText}>Already have an account?  <Text style={{ color: '#7041EE' }}>sign in</Text></Text>
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
