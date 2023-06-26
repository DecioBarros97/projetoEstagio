import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { FiCheckCircle, FiSearch } from 'react-icons/fi';
import { Rings } from 'react-loader-spinner';
import './styles.css';
import api from "./services/api";
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';

function Loading() {
 
  return <h2>🌀 Loading...</h2>;

}
//------ const ------
function App() {

  const [games, setGame] = useState([])
  const [input, setInput] = useState("")
  const [gamesBuscados, setGameBuscados] = useState([])
  const [generos, setGeneros] = useState([])
  const [selectedGenero, setGenero] = useState("todos")

  useEffect(() => {
    const fetchData = async () => {
      await getGames()

    }
    fetchData()

  }, [])
  async function getGames() {


    try {
      const response = await api.get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data", {  // API
        timeout: 5000, // não esperar mais que 5 segundos pelo retorno.
        headers: {
          'dev-email-address': 'deciobarros97@gmail.com' // headers
        }
      });
      // genero de jogos 
      setGame(response.data)
      setGameBuscados(response.data)
      const gen = response.data.map(game => game.genre)
      setGeneros(gen.filter((ge, index) => { return gen.indexOf(ge) === index }))
    } catch (error) {

      setGame([])
      setGameBuscados([])
      setGeneros([])
      // alertas de erros  
      //-- não esperar mais que 5 segundos pelo retorno.
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        alert("O servidor demorou para responder, tente mais tarde");
      }
      //Quando a API retornar o status code 500, 502, 503, 504, 507, 508 ou 509
      else if (error.response.status >= 500 && error.response.status <= 509) {
        alert("O servidor fahou em responder, tente recarregar a página");
        //Caso a API retorne outros erros
      } else {
        alert("O servidor não conseguirá responder por agora, tente voltar novamente mais tarde")
      }
    }
  }


  function handleSearch() {
 // Filtro de generos e botao de pesquisa 
    console.log(selectedGenero)

    if (input === "" && selectedGenero === "todos") {

      setGameBuscados(games);

    } else if (selectedGenero === "todos") {
      setGameBuscados(games.filter(game => game.title.toLowerCase().includes(input.toLowerCase())))

    } else if (input === "" && selectedGenero !== "todos") {
      setGameBuscados(games.filter(game => game.genre.toLowerCase().includes(selectedGenero)))

    } else if (selectedGenero !== "todos") {
      setGameBuscados(games.filter(game => game.title.toLowerCase().includes(input.toLowerCase())
        && game.genre.toLowerCase().includes(selectedGenero)))

    }
  }






  return (
    // Loading 
    <Suspense fallback={<Loading />}>
      <div className="container">
        <h1 className="title"> Lista Games</h1>
        <h3 className='subTitle'> Prepare-se para mergulhar em um mundo repleto de emoção e aventuras sem limites! Bem-vindo ao nosso incrível portal de jogos,
          onde a diversão ganha vida e a sua imaginação é o único limite!</h3>

        <div className='containerInput'>
         
          <select value={selectedGenero} onChange={(evento) => { setGenero(evento.target.value) }} >
            <option value={"todos"} >  Todos </option>
            {
              generos.map(genero => {
                return (
                  <option value={genero.toLowerCase()}> {genero} </option>
                )
              })
            }
          </select>

          <input id="input" type="text" placeholder="Buscar" onChange={(evento) => setInput(evento.target.value)}/>

          <button className='buttonSearch' onClick={handleSearch}>
            <FiSearch size={18} color="fff" />
          </button>

        </div>




        <div className='colunas' >
          {
            // puxa dados da API
            gamesBuscados.map(game => {
              return (
                <div className='coluna1' key={game.id} >
                  <h2> {game.title} </h2>
                  <p>  {game.short_description}</p>
                  <h5> {game.genre} </h5>
                  <h6> {game.platform}</h6>
                  <img src={game.thumbnail} />
                </div>
              )
            })
          }
        </div>
      </div>
    </Suspense>
  );
}

export default App;
