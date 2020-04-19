import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import SigninScreen from './Screens/SigninScreen'
import SignupScreen from './Screens/SignupScreen'


const stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <stack.Screen name="signin" component={SigninScreen} />
        <stack.Screen name="signup" component={SignupScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}


