// AppContext.tsx
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'

import { Character } from '../interfaces/character.interface'

interface AppContextType {
  likedCharacters: Character[]
  likeCharacter: (character: Character) => void
  unlikeCharacter: (character: Character) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}

export const AppContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [likedCharacters, setLikedCharacters] = useState<Character[]>([])

  const likeCharacter = (character: Character) => {
    likedCharacters.some(likedCharacter => likedCharacter === character)
      ? null
      : setLikedCharacters(prev => [...prev, character])
  }

  const unlikeCharacter = (character: Character) => {
    setLikedCharacters(prev =>
      prev.filter(likedCharacter => likedCharacter.id !== character.id)
    )
  }

  const contextValue = {
    likedCharacters,
    likeCharacter,
    unlikeCharacter
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
