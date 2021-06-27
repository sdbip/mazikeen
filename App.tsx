import React, { useState } from 'react';
import { Button, FlatList, Image, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, Header } from '@react-navigation/stack'
import { TapGestureHandler } from 'react-native-gesture-handler';

const Stack = createStackNavigator()

interface Show {
  id: string,
  title: string,
  image: string | undefined
}

const SearchScreen = (props: any) => {
  const [data, setData] = useState([] as Show[])
  const [timer, setTimer] = useState(null as NodeJS.Timeout | null)

  const renderShow = (show: Show) => (
    <TapGestureHandler onActivated={(data) => props.navigation.push('ShowScreen', show)}>
      <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <Image style={{width: 50, height: 50, marginRight: 10}} source={{uri: show.image ?? ''}} />
        <Text style={{color: 'black'}}>{show.title}</Text>
      </View>
    </TapGestureHandler>
  )

  const searchAfter = (millis: number, searchString: string) => {
    if (timer) clearTimeout(timer);
  
    const newTimer = setTimeout(() => performSearch(searchString), millis);
    setTimer(newTimer)
  }

  const performSearch = async (searchText: string) => {
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchText}`)
    if (!response.ok) {
      setData([{id: 'error', title: await response.text(), image: ''}])
    }

    const json = await response.json()
    console.info('json', json)
    const data = json
      .map((o: any) => ({id: o.show.id, title: o.show.name, image: o.show.image?.medium}))
    console.info('data', data)
    setData(data)
  }
  
  return (
    <View>
      <TextInput
          style={{backgroundColor: 'white', margin: 10, padding: 5, borderRadius: 10}}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(text) => searchAfter(1000, text)}
       />
      <FlatList
          contentInsetAdjustmentBehavior="automatic"
          style={{}}
          data={data}
          renderItem={(itemData) => {return renderShow(itemData.item)}}
          keyExtractor={item => item.id}
        >
      </FlatList>
    </View>
  )
}

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
