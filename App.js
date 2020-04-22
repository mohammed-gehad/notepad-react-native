import React, { useContext, useState } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./Context/AuthContext";
import {
  Provider as NoteProvider,
} from "./Context/NoteContext";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import SigninScreen from "./Screens/SigninScreen";
import SignupScreen from "./Screens/SignupScreen";
import NoteListScreen from "./Screens/NoteListScreen";
import CreateNoteScreen from "./Screens/CreateNoteScreen";
import AccountScreen from "./Screens/AccountScreen";
import NoteScreen from "./Screens/NoteScreen";
import UpdateNoteScreen from "./Screens/UpdateNoteScreen";

const stack = createStackNavigator();
const tab = createBottomTabNavigator();

function NoteListStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="noteList" component={NoteListScreen} />
      <stack.Screen name="note" component={NoteScreen} />
      <stack.Screen name="updateNote" component={UpdateNoteScreen} />
    </stack.Navigator>
  );
}

function App() {
  const {
    state: { token },
    getUserInfo,
    getToken,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    //AsyncStorage.removeItem('token')

    //for fast,auto login
    getToken().then((result) => setIsLoading(result));

    //fetching user info from DB into userContext
    getUserInfo().then((result) => setIsLoading(result));
  }, [isLoading]);

  if (isLoading)
    return (
      <View
        style={{
          backgroundColor: "#FAFBFD",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );

  return (
    <NavigationContainer>
      {!token ? (
        <>
          <stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <stack.Screen name="signin" component={SigninScreen} />
            <stack.Screen name="signup" component={SignupScreen} />
          </stack.Navigator>
        </>
      ) : (
        <>
          <tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "noteStack") {
                  iconName = "ios-list";
                } else if (route.name === "createNote") {
                  iconName = "ios-add";
                } else if (route.name === "account") {
                  iconName = "ios-options";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={color} />;
              }
            })}

            tabBarOptions={{
              activeTintColor: "#7041EE",
              inactiveTintColor: "gray",
              showLabel:false
            }}
          >
            <tab.Screen name="noteStack" component={NoteListStack} />
            <tab.Screen name="createNote" component={CreateNoteScreen} />
            <tab.Screen name="account" component={AccountScreen} />
          </tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <NoteProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </NoteProvider>
  );
};
