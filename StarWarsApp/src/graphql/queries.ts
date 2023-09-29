// graphql/queries.ts
import { gql } from '@apollo/client'

export const GET_MOVIE_DETAILS = gql`
  query GetMovie($filmId: ID!) {
    film(id: $filmId) {
      id
      title
      releaseDate
      openingCrawl
      speciesConnection {
        totalCount
      }
      planetConnection {
        totalCount
      }
      vehicleConnection {
        totalCount
      }
      characterConnection {
        characters {
          id
          name
        }
      }
    }
  }
`

export const GET_MOVIES = gql`
  query GetMovies {
    allFilms {
      films {
        id
        title
        releaseDate
        openingCrawl
      }
    }
  }
`

export const GET_CHARACTER = gql`
  query GetPerson($personId: ID!) {
    person(id: $personId) {
      id
      name
      birthYear
      height
      mass
      homeworld {
        name
      }
      filmConnection {
        films {
          title
        }
      }
    }
  }
`
