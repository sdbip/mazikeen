import React from 'react'
import { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
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

  const [imageHeight, setImageHeight] = useState(200)
  const width = Dimensions.get('window').width
  updateImageHeight()

  props.navigation.setOptions({title: `${show.name} (${show.rating ?? 'not rated'})`});

  return (
    <ScrollView>
      {show.image && <Image style={{flex: 1}} source={{uri: show.image ?? '', height: imageHeight, width: width}} />}
      <Text>{show.channel} {show.year} {show.country && `(${show.country})`}</Text>
      <HTMLView value={show.summary ?? '<p><em>No summary was returned</em></p>'} stylesheet={{p: {margin: 15}}} />
    </ScrollView>
  )

  function updateImageHeight() {
    if (!show.image) return

    Image.getSize(show.image, (_width, _height) => setImageHeight(width / _width * _height));
  }
}

export default ShowScreen
