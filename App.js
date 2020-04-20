import React,{useContext, useState} from 'react';
import { AsyncStorage , ActivityIndicator,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider as AuthProvider , Context as AuthContext} from './Context/AuthContext.js'
import Ionicons from 'react-native-vector-icons/Ionicons';


//screens
import SigninScreen from './Screens/SigninScreen'
import SignupScreen from './Screens/SignupScreen'
import NoteListScreen from './Screens/NoteListScreen'
import CreateNoteScreen from './Screens/CreateNoteScreen'
import AccountScreen from './Screens/AccountScreen'



const stack = createStackNavigator()
const tab = createBottomTabNavigator()
function App() {
  const {state:{token},getUserInfo,getToken} = useContext(AuthContext)
  const [isLoading , setIsLoading] =useState(true)

  React.useEffect(() => {
    //AsyncStorage.removeItem('token')

    //for fast,auto login
    getToken().then(result => setIsLoading(result))

    //fetching user info from DB into userContext
    getUserInfo().then(result => setIsLoading(result))

    
  }, [isLoading])

  console.log(token)


  if(isLoading)return(
    <View style={{
        backgroundColor: "#FAFBFD",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }}>
       <ActivityIndicator/>
    </View>
  )

  return (
    <NavigationContainer>
      {!token ?
      (
        <>
        <stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <stack.Screen name="signin" component={SigninScreen} />
        <stack.Screen name="signup" component={SignupScreen} />
        </stack.Navigator>
        </>
      ) :
      (
        <>
        <tab.Navigator
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //     let iconName;

        //     if (route.name === 'noteList') {
        //       iconName = focused
        //         ? 'ios-information-circle'
        //         : 'ios-information-circle-outline';
        //     } else if (route.name === 'createNote') {
        //       iconName = focused ? 'ios-list-box' : 'ios-list';
        //     }

        //     // You can return any component that you like here!
        //     return <Ionicons name={iconName} size={size} color={color} />;
        //   },
        // })}
        // tabBarOptions={{
        //   activeTintColor: 'tomato',
        //   inactiveTintColor: 'gray',
        // }}
      >
        <tab.Screen name="noteList" component={NoteListScreen} />
        <tab.Screen name="createNote" component={CreateNoteScreen} />
        <tab.Screen name="account" component={AccountScreen} />
        </tab.Navigator>
        </>
      )}
     
    </NavigationContainer>
  );
}


export default ()=>{
  return(
    <AuthProvider>
      <App/>
    </AuthProvider>
  )
}