// navigation/StackNavigation.tsx
import {
  NativeStackNavigationProp,
  createNativeStackNavigator
} from '@react-navigation/native-stack'
import React from 'react'

import { Character } from '../interfaces/character.interface'
import { Movie } from '../interfaces/movie.interface'
import CharacterScreen from '../screens/CharacterScreen'
import HomeScreen from '../screens/HomeScreen'
import MovieScreen from '../screens/MovieScreen'

type RootStackParamList = {
  Home: undefined
  Character: { character: Character }
  Movie: { movie: Movie }
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Character'
        component={CharacterScreen}
        options={{
          title: `Character`
        }}
      />
      <Stack.Screen
        name='Movie'
        component={MovieScreen}
        options={{
          title: `Movie`
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation
