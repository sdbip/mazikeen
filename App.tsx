import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const Screen1 = () => {
  return (
    <Text>Screen 1</Text>
  )
}
const Screen2 = () => {
  return (
    <Text>Screen 2</Text>
  )
}
const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Screen1} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
