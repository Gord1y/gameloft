import { useQuery } from '@apollo/client'
import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { useAppContext } from '../context/AppContext'
import { GET_CHARACTER } from '../graphql/queries'
import { Character } from '../interfaces/character.interface'

type RootStackParamList = {
  Character: { character: Character }
}

type CharacterScreenRouteProp = RouteProp<RootStackParamList, 'Character'>

const CharacterScreen = () => {
  const route = useRoute<CharacterScreenRouteProp>()
  const { character } = route.params
  const { likedCharacters, likeCharacter, unlikeCharacter } = useAppContext()
  const [isLiked, setIsLiked] = useState(false)

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { personId: character.id }
  })

  const [person, setPerson] = useState<Character>()

  useEffect(() => {
    if (!loading && data) {
      setIsLiked(likedCharacters.includes(data.person))
      setPerson(data.person)
    }
  }, [data])

  const handleLikeCharacter = () => {
    if (person) {
      if (!isLiked) {
        likeCharacter(person)
        setIsLiked(true)
      } else {
        unlikeCharacter(person)
        setIsLiked(false)
      }
    }
  }

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {person && (
        <View>
          <Text style={styles.title}>Character Details</Text>
          <Text style={styles.detail}>Name: {person.name}</Text>
          <Text style={styles.detail}>Birth Year: {person.birthYear}</Text>
          <Text style={styles.detail}>Height: {person.height}</Text>
          <Text style={styles.detail}>Mass: {person.mass}</Text>
          <Text style={styles.detail}>Homeworld: {person.homeworld.name}</Text>
          <Text style={styles.detail}>Films:</Text>
          {person.filmConnection.films.map(film => (
            <Text key={film.title} style={styles.film}>
              {film.title}
            </Text>
          ))}
          <Text style={styles.isLiked}>Is Liked: {isLiked ? 'Yes' : 'No'}</Text>
          <Button
            title={isLiked ? 'Unlike Character' : 'Like Character'}
            onPress={handleLikeCharacter}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  film: {
    fontSize: 16,
    marginLeft: 8
  },
  isLiked: {
    fontSize: 16,
    marginTop: 8
  }
})

export default CharacterScreen
