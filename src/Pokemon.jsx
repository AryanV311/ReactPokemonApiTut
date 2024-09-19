import { useEffect, useState } from "react";
import "./index.css"
import { PokemonCard } from "./PokemonCard";


export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    const fetchPokemon = async() => {
        try {
            const res = await fetch(API);
            const data = await res.json()
            
            const detailedPokemon = data.results.map( async(curElem) => {
                // console.log(curElem.url);
                const res = await fetch(curElem.url);
                const data = await res.json();
                // console.log(data);
                return data;
            })
            //  console.log(detailedPokemon);
            const detailedResponse = await Promise.all(detailedPokemon);
            console.log(detailedResponse);
            setPokemon(detailedResponse);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        fetchPokemon();
    },[])

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
      );

    if(loading){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h2>{error}</h2>
            </div>
        )
    }


  return (
    <section className="conatiner">
        <header>
            <h1>Lets catch pokemon</h1>
        </header>
        <div className="pokemon-search">
            <input type="text" placeholder="Search pokemon" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div>
            <ul className="cards">
                {
                    //  pokemon.map((curPokemon) => 
                        
                        searchData.map((curPokemon) =>   {
                       return <PokemonCard key={curPokemon.id} pokemonData={curPokemon}/>
                    })
                }
            </ul>
        </div>
    </section>
  )
}
