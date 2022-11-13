import {useEffect, useState} from 'react'
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import './App.css';
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [nextURL, setNextURL] = useState('')
  const [prevURL, setPrevURL] = useState('')

  useEffect(() =>{
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL)
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results)
      setNextURL(res.next)
      setPrevURL(res.previous)
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

  const handlePrevPage = async() => {
    if(prevURL){
      setLoading(true)
      let res = await getAllPokemon(prevURL)
      loadPokemon(res.results)
      setNextURL(res.next)
      setPrevURL(res.previous)
      setLoading(false)
    }
  }

  const handleNextPage = async() => {
    if(nextURL){
      setLoading(true)
      let res = await getAllPokemon(nextURL)
      loadPokemon(res.results)
      setNextURL(res.next)
      setPrevURL(res.previous)
      setLoading(false)
    }
  }


  return (
    <>
      <Navbar />
      <div className='App'>
        {loading ? (
          <h1>now Loading...</h1>
        ) :
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        }
      </div>
    </>
  );
}

export default App;
