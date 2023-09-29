import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

import { useAppContext } from '../context/AppContext'
import { Character } from '../interfaces/character.interface'
import { NavigationProps } from '../navigation/StackNavigation'

const LikedCharactersTab = () => {
  const { likedCharacters } = useAppContext()
  const navigation = useNavigation<NavigationProps>()

  const navigateToCharacterScreen = (character: Character) => {
    navigation.navigate('Character', {
      character: character
    })
  }

  if (likedCharacters.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          You have not liked any characters yet.
        </Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Characters</Text>
      <FlatList
        data={likedCharacters}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.characterItem}
            onPress={() => navigateToCharacterScreen(item)}
          >
            <Text style={styles.characterName}>Name: {item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F0F0F0',
    maxHeight: 200
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  emptyText: {
    fontSize: 16
  },
  characterItem: {
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
  characterName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default LikedCharactersTab
