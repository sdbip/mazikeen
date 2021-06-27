import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TapGestureHandler } from 'react-native-gesture-handler';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator()

const ShowScreen = (props: any) => {
  return (
    <Text>Screen 2: {props.route.params.id}</Text>
  )
}
const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ShowScreen" component={ShowScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
