import React from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator()

const ShowScreen = (props: any) => {
  props.navigation.setOptions({title: props.route.params.title});

  return (
    <Text>Screen 2: {props.route.params.id}</Text>
  )
}

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} options={{title: 'TVMaze Shows'}} />
      <Stack.Screen name="ShowScreen" component={ShowScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
