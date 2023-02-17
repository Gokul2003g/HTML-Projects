import {useState, useEffect} from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

//? key:8ab3e61a

const API_URL = "http://www.omdbapi.com?apikey=8ab3e61a";

const movie1 = {
  Title: "Shinchan",
  Year: "1992–",
  imdbID: "tt12853970",
  Type: "series",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BN2VmOWRlMjEtY2M1NC00NjdmLTg1MjktMDYxNzg3ZTNiMDUxXkEyXkFqcGdeQXVyNTk5ODg4NDA@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>PadamParungaDaa</h1>
      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchMovies(searchTerm)
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
