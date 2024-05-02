/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useState } from "react";
import Button from "../ui/Button/Button"
import StyledHero from "./Hero.styled"
import axios from "axios";
import ENDPOINTS from "../../utils/constants/endpoint";

function Hero() {
  // Membuat state movie
  const [movie, setMovie]= useState("");
  const genres = movie && movie.genres.map((genre) => genre.name).join(", ");
  const trailer = movie && `https://www.youtube.com/watch?v=${movie.videos.results[0].key}`;  

  useEffect(()=>{
    getDetailMovie();
  }, [])

  //mendapatkan 1 data dari trending movies
  async function getTrendingMovies() {
    const response = await axios(ENDPOINTS.TRENDING);
    return response.data.results[0];
  }

  // membuat fungsi untuk menambahkan detail movie
  async function getDetailMovie(){
    // ambil id dari trending movie
    const trendingMovie = await getTrendingMovies();
    const id = trendingMovie.id;

    // fetch detail movie by id
    const response = await axios(ENDPOINTS.DETAIL(id));

    setMovie(response.data);
  }

  return (
    <StyledHero>
      <section>
        <div className="hero__left">
          <h2>{movie.title}</h2>
          <h3>
            {genres}
          </h3>
          <p>
          {movie.overview}
          </p>
          <Button as="a" href={trailer} target="blank">Watch</Button>
        </div>
        <div className="hero__right">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.Title}
          />
        </div>
      </section>
    </StyledHero>
  );
}

export default Hero;