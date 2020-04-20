import React,{useState , useContext} from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity ,AsyncStorage } from "react-native";
import { Button, Input, Divider } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import {Context as AuthContext} from '../Context/AuthContext'
import styles from '../assets/style'

const SigninScreen = ({ navigation }) => {
    const {state , signin} = useContext(AuthContext)
    const [email , setEmail] = useState('Pu2k@hotmail.com')
    const [password , setPassword] = useState('Msamsamsa3')
    const [errMessage , setErrMessage] = useState(null)

    let [fontsLoaded] = useFonts({
        CircularStdBlack: require("../assets/Fonts/CircularStd-Black.ttf"),
        CircularStdBold: require("../assets/Fonts/CircularStd-Bold.ttf"),
        CircularStdBook: require("../assets/Fonts/CircularStd-Book.ttf"),
        CircularStd: require("../assets/Fonts/CircularStd.ttf"),
    });

    //event clears error message when navigate to another screen
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          setErrMessage(null)
        });
    
        return unsubscribe;
      }, [navigation]);
  
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
                        signin(email,password).catch(e=>setErrMessage(e))
                    }}
                />
                <Divider style={styles.divider} />

                <TouchableOpacity onPress={() => navigation.navigate('signup')}>

                    <Text style={styles.subText}>New around here?  <Text style={{ color: '#7041EE' }}>create an account</Text></Text>
                </TouchableOpacity>

                {errMessage ? <Text style={styles.errMessage} >{errMessage}</Text> : null}

            </View>
        );
    }
};

// const styles = StyleSheet.create({

// });
export default SigninScreen;
