import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from './screens/SearchScreen';
import ShowScreen from './screens/ShowScreen';

const Stack = createStackNavigator()

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
