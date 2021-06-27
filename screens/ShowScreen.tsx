import React from 'react'
import { Image, Text, View } from 'react-native';

export interface Show {
  name: string,
  summary: string,
  rating: string,
  image: string | null
}

const ShowScreen = (props: any) => {
  const show = props.route.params as Show

  props.navigation.setOptions({title: `${show.name} (${show.rating ?? 'not rated'})`});

  return (
    <View 
        style={{flexDirection: 'column', alignItems: 'center', height: '100%'}}>
      <Image style={{width: '100%', flex: 1}} source={{uri: show.image ?? ''}} />
      <Text>{show.summary}</Text>
    </View>
  )
}

export default ShowScreen
