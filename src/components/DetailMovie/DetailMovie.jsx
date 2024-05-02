import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "../ui/Button/Button";
import StyledDetailMovie from "./DetailMovie.styled";
import ENDPOINTS from "../../utils/constants/endpoint";

function DetailMovie() {
    const {id} = useParams();
    const [movie, setMovie] = useState("");
    const genres = movie && movie.genres.map((genre) => genre.name).join(", ");
    const trailer = movie && `https://www.youtube.com/watch?v=${movie.videos.results[0]?.key || "byVrO2Dk_Ac"}`;

    useEffect(()=> {
        getDetailMovieById();
    }, [id]);

    async function getDetailMovieById() {
        const response = await axios(ENDPOINTS.DETAIL(id));
    
        setMovie(response.data)
    }
    console.log(movie);
    

    return(
        <StyledDetailMovie>  
            <div className="poster">
                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.Title}/>   
            </div>
            <div className="info">
                <h2>{movie.title}</h2>
                <h3>{genres}</h3>
                <p>{movie.overview}</p>
                <Button as="a" href={trailer} target="_blank" size="lg">Watch</Button>
            </div>
        </StyledDetailMovie>
    );
}

export default DetailMovie;