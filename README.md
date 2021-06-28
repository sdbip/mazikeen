# Mazikeen (TV Series Search)

Sample of work for Astra Zeneca

## Running the application

### Android

Build by running 

```
yarn install
```

Then run the following:

```
npx react-native run-android
```

You can also run by opening the android folder in Android Studio and runnning from there.

### iOS

Build by running the following:

```
yarn install
cd ios
pod install
```

Then open ios/Mazikeen.xcworkspace in Xcode and run from there.


## Nice-to-haves and if-I-had-more-time features

The TV Maze API does not return more than a few matches from a search. I don't see the need for paging (or endless scrolling). Nor have I seen any way to add paging parameters to their search URL.

The other nice-to-haves (persistent cache and favourites) would be interesting to add if there was more time.

There's a warning when the show doesn't have a `medium` image. I should probably use the `original` image as fallback, or if that too is missing: a static (bundled) image.

I believe that if I had written the nested functions using the `function` keyword, I could place them at the end of their parent function. This would probably make the parent more readable (and the parent is probably more important than its nested children to the reader). The `const` format (which I chose because it seems to be much more popular) requires that they are defined (assignments executed) before they can be called.

I have assumed that the JSON returned from TVMaze is always valid (except if the response is not `ok()`). This assumption holds for all the series I have tested, but I cannot test them all (and certainly not changes that may happen in the future). I should probably handle bad JSON and missing fields (beyond missing images). And also if a field is of a different type than expected.

It would be cool if you could play the theme song from the show details. And trailers or memorable scenes, but that will probably require backend support.

I suppose I could add links to the “externals” (tvrage, thetvdb or imdb).

## Referenced Packages

- react-navigation
- react-native-gesture-handler
- react-native-htmlview

The summaries are returned from TVMaze with HTML tags. (Don't askk me why you would do such a thing.) In order to display them properly, I need a way to display HTML, so the `HTMLView`.

## What's with the name?

Mazikeen (Maze) is a deamon in the DC universe. She is one of the main characters on [the Lucifer Netflix show][Lucifer], played by [Leslie-Ann Brandt][Leslie]

![Maze][Maze]

<!-- Links -->
[Lucifer]: https://www.imdb.com/title/tt4052886/
[Maze]: maze.jpg
[Leslie]: https://www.imdb.com/name/nm2788229/
