import React, { useState } from 'react'
import { Alert, FlatList, Image, Text, TextInput, View } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { getDetails, findShows, ErrorResult } from './tvmaze'
import { Show } from "./Show"

const SearchScreen = (props: any) => {
  const [data, setData] = useState([] as Show[])
  const [timer, setTimer] = useState(null as NodeJS.Timeout | null)
  const [mode, setMode] = useState('none' as 'none'|'no_data'|'loading')

  return (
    <View>
      <TextInput
          style={{backgroundColor: 'white', margin: 10, padding: 5, borderRadius: 10}}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="Search TV Shows..."
          clearButtonMode={'always' /* iOS only */}
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
          renderItem={(itemData) => {return renderShowItem(itemData.item)}}
          keyExtractor={item => item.id}
         />)}
    </View>
  )

  function renderShowItem(show: Show) {
    return (
      <TapGestureHandler onActivated={() => displayShowDetails(show)}>
        <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <Image style={{width: 50, height: 50, marginRight: 10}} source={{uri: show.image ?? ''}} />
          <Text style={{color: 'black'}}>{show.title}</Text>
        </View>
      </TapGestureHandler>
    )
  }

  async function displayShowDetails(show: Show) {
    const result = await getDetails(show)
    if (result[0] == 'error') {
      alertError(result)
      return
    }

    const [_, details] = result
    props.navigation.push('ShowScreen', details)
  }

  function searchAfter(millis: number, searchString: string) {
    if (timer) clearTimeout(timer)
  
    const newTimer = setTimeout(() => performSearch(searchString), millis)
    setTimer(newTimer)
  }

  async function performSearch(searchText: string) {
    setMode('loading')
    const result = await findShows(searchText)
    if (result[0] == 'error') {
      alertError(result)
      setMode('no_data')
      return
    }

    const [_, data] = result
    setData(data)
    setMode(data.length ? 'none' : 'no_data')
  }

  function alertError(result: ErrorResult) {
    const [_, errorTitle, errorMessage] = result
    Alert.alert(errorTitle, errorMessage)
  }
}

export default SearchScreen
