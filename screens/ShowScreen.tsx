import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

export interface Show {
  name: string,
  year: number,
  channel: string,
  country: string | null,
  summary: string,
  rating: string,
  image: string | null
}

const ShowScreen = (props: any) => {
  const show = props.route.params as Show

  props.navigation.setOptions({title: `${show.name} (${show.rating ?? 'not rated'})`});

  return (
    <ScrollView>
      <Image style={{flex: 1}} source={{uri: show.image ?? '', height: 200}} />
      <Text>{show.channel} {show.year} {show.country && `(${show.country})`}</Text>
      <HTMLView value={show.summary ?? '<p><em>No summary was returned</em></p>'} stylesheet={{p: {margin: 15}}} />
    </ScrollView>
  )
}

export default ShowScreen
