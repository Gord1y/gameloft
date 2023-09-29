// App.tsx
import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { AppContextProvider } from './src/context/AppContext'
import StackNavigation from './src/navigation/StackNavigation'
import { client } from './src/services/apolo'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </AppContextProvider>
    </ApolloProvider>
  )
}

export default App
