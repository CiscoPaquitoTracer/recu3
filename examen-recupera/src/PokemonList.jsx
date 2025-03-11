import { useState, useEffect } from 'react'
import axios from 'axios' //Cosas a usar 'comilla simple `invertida "normales xd 

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([])
    const [offSet, setOffSet] = useState(0)
    const [error, setError] = useState()
    const limit = 10

    useEffect(()=>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon?${limit}&${offSet}`)
        .then((result)=>{
            setPokemonList(result.data.results)
        })
        .catch((e)=>{
            setError(e.message)
        })
    },[offSet])

  return (

   <div>
        {error&&<p>{error}</p>}
        <ul>
            {pokemonList.map((pokemon, index)=>{
                const pokemonId = offSet + index + 1
                return(
                    <li>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemon.name}></img>
                        <p>{pokemon.name}</p>
                    </li>
                )                
            })}
        </ul>
        <button onClick={()=>setOffSet((prev)=>Math.max(prev-limit,0))}>Atras</button>
        <button onClick={()=>setOffSet((prev)=>Math.max(prev+limit))}>Adelante</button>
   </div>  
  )
}

export default PokemonList