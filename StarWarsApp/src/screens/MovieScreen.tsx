import { useQuery } from '@apollo/client'
import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { GET_MOVIE_DETAILS } from '../graphql/queries'
import { Character } from '../interfaces/character.interface'
import { Movie } from '../interfaces/movie.interface'
import { NavigationProps } from '../navigation/StackNavigation'

type RootStackParamList = {
  Movie: { movie: Movie }
}

type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>

interface MovieScreenProps {
  route: MovieScreenRouteProp
}

const MovieScreen: React.FC<MovieScreenProps> = ({ route }) => {
  const { movie } = route.params

  const { loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
    variables: { filmId: movie.id }
  })

  const [film, setFilm] = useState<Movie>()

  const { navigate } = useNavigation<NavigationProps>()

  useEffect(() => {
    if (!loading && data) {
      setFilm(data.film)
    }
  }, [loading, data])

  const handleCharacterPress = (character: Character) => {
    navigate('Character', { character: character })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {film && (
        <View>
          <Text style={styles.title}>Title: {film.title}</Text>
          <Text style={styles.detail}>Release Date: {film.releaseDate}</Text>
          <Text style={styles.detail}>Opening Crawl:</Text>
          <Text style={styles.crawl}>{film.openingCrawl}</Text>
          <Text style={styles.sectionTitle}>
            Total Species: {film.speciesConnection.totalCount}
          </Text>
          <Text style={styles.sectionTitle}>
            Total Planets: {film.planetConnection.totalCount}
          </Text>
          <Text style={styles.sectionTitle}>
            Total Vehicles: {film.vehicleConnection.totalCount}
          </Text>
          <Text style={styles.sectionTitle}>Characters:</Text>
          {data?.film.characterConnection.characters.map(
            (character: Character) => (
              <Text
                key={character.name}
                style={styles.characterName}
                onPress={() => handleCharacterPress(character)}
              >
                Character Name: {character.name}
              </Text>
            )
          )}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  detail: {
    fontSize: 16,
    marginBottom: 8
  },
  crawl: {
    fontSize: 16,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8
  },
  characterName: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 8
  }
})

export default MovieScreen
