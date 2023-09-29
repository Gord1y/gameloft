import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import LikedCharactersTab from '../components/LikedCharactersTab'
import { GET_MOVIES } from '../graphql/queries'
import { Movie } from '../interfaces/movie.interface'
import { NavigationProps } from '../navigation/StackNavigation'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>()
  const { loading, error, data } = useQuery(GET_MOVIES)
  const [sortByOldest, setSortByOldest] = useState<boolean>(false)

  const toggleSorted = () => {
    setSortByOldest(prev => !prev)
  }

  const handleNavigateToMovieScreen = (movie: Movie) => {
    navigation.navigate('Movie', { movie: movie })
  }

  if (loading) {
    return <ActivityIndicator size='large' style={styles.loadingIndicator} />
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const movies = data.allFilms.films.slice().sort((a: Movie, b: Movie) => {
    if (sortByOldest) {
      return (
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      )
    } else {
      return (
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={sortByOldest ? 'Sort by Newest' : 'Sort by Oldest'}
          onPress={toggleSorted}
        />
      </View>

      <FlatList
        data={movies}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Text style={styles.movieTitle}>Title: {item.title}</Text>
            <Text style={styles.releaseDate}>
              Release Date: {item.releaseDate}
            </Text>
            <Text style={styles.openingCrawl}>
              Opening Crawl: {item.openingCrawl.slice(0, 50)}...
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title='View Movie Details'
                onPress={() => handleNavigateToMovieScreen(item)}
              />
            </View>
          </View>
        )}
      />

      <LikedCharactersTab />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0'
  },
  buttonContainer: {
    marginBottom: 16
  },
  movieItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  releaseDate: {
    fontSize: 16
  },
  openingCrawl: {
    fontSize: 16,
    marginTop: 8
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen
