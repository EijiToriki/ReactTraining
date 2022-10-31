import {useEffect, useState} from 'react'
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import './App.css';
import Card from './components/Card/Card.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])

  useEffect(() =>{
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL)
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results)

      setLoading(false)
    }
    fetchPokemonData()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  }

  console.log(pokemonData)

  return (
    <>
      {loading ? (
        <h1>now Loading...</h1>
      ) :
        <div className='pokemonCardContainer'>
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />
          })}
        </div>
      }
    </>
  );
}

export default App;
