import React,{useState , useContext} from "react";
import { View, Text, StyleSheet, ActivityIndicator,TouchableOpacity } from "react-native";
import { Button, Input, Divider } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import {Context as AuthContext} from '../Context/AuthContext'
import styles from '../assets/style'


const SigninScreen = ({navigation}) => {
    const {state , signup }= useContext(AuthContext)
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [username , setUsername] = useState('')
    const [errMessage , setErrMessage] = useState(null)

        //event clears error message when navigate to another screen
        React.useEffect(() => {
            const unsubscribe = navigation.addListener('blur', () => {
              setErrMessage(null)
            });
        
            return unsubscribe;
          }, [navigation]);


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
                        signup(username,email,password).catch(e=>setErrMessage(e))
                    }}
                />
                <Divider style={styles.divider} />

                <TouchableOpacity onPress={()=>navigation.navigate('signin')}>
                <Text style={styles.subText}>Already have an account?  <Text style={{ color: '#7041EE' }}>sign in</Text></Text>
                </TouchableOpacity>

                {errMessage ? <Text style={styles.errMessage} >{errMessage}</Text> : null}



            </View>
        );
    }
};

// const styles = StyleSheet.create({
// });
export default SigninScreen;
