export interface Character {
  id: string
  name: string
  birthYear: string
  height: number
  mass: number
  homeworld: { name: string }
  filmConnection: {
    films: { title: string }[]
  }
}
