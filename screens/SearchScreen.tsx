import React, { useState } from 'react';
import { Alert, FlatList, Image, Text, TextInput, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Show as Details } from './ShowScreen';

interface Show {
  id: string,
  title: string,
  url: string,
  image: string | undefined
}

const SearchScreen = (props: any) => {
  const [data, setData] = useState([] as Show[])
  const [timer, setTimer] = useState(null as NodeJS.Timeout | null)
  const [mode, setMode] = useState('none')

  const renderShow = (show: Show) => (
    <TapGestureHandler onActivated={() => displayShow(show)}>
      <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <Image style={{width: 50, height: 50, marginRight: 10}} source={{uri: show.image ?? ''}} />
        <Text style={{color: 'black'}}>{show.title}</Text>
      </View>
    </TapGestureHandler>
  )

  const displayShow = async (show: Show) => {
    const response = await fetch(show.url)
    if (!response.ok) {
      Alert.alert('TV Maze returned an error status', await response.text())
      return
    }

    const json = await response.json()
    const details: Details = {
      name: json.name,
      summary: json.summary,
      rating: json.rating.average,
      image: json.image.original
    }
    props.navigation.push('ShowScreen', details)
  }

  const searchAfter = (millis: number, searchString: string) => {
    if (timer) clearTimeout(timer);
  
    const newTimer = setTimeout(() => performSearch(searchString), millis);
    setTimer(newTimer)
  }

  const performSearch = async (searchText: string) => {
    setMode('loading')
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchText}`)
    if (!response.ok) {
      Alert.alert('TV Maze returned an error status', await response.text())
      return
    }

    const json = await response.json()
    const data = json
      .map((o: any) => ({
        id: o.show.id,
        title: o.show.name,
        url: o.show._links.self.href,
        image: o.show.image?.medium
      }))
    setData(data)
    setMode(data.length ? 'none' : 'no_data')
  }
  
  return (
    <View>
      <TextInput
          style={{backgroundColor: 'white', margin: 10, padding: 5, borderRadius: 10}}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="Search TV Shows..."
          onChangeText={(text) => searchAfter(1000, text)}
       />
      {mode == 'loading'
      ? (<Text>Loading...</Text>)
      : mode == 'no_data'
      ? (<Text>No data found</Text>)
      : (
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          data={data}
          renderItem={(itemData) => {return renderShow(itemData.item)}}
          keyExtractor={item => item.id}
        />)}
    </View>
  )
}

export default SearchScreen;
