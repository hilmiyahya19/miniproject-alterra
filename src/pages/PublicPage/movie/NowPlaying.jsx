import { useEffect } from "react";
import axios from "axios";
import ENDPOINTS from "../../../utils/constants/endpoint";
import { useDispatch } from "react-redux";
import { updateMovies } from "../../../features/moviesSlice";
import Movies from "../../../components/Movies/Movies";
import Hero from "../../../components/Hero/Hero"

function NowPlaying () {
    //membuat dispatch
    const dispatch = useDispatch() 

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
  
    async function getNowPlayingMovies(){
            // Fetch data dari axios
            const response = await axios(ENDPOINTS.NOWPLAYING);
            dispatch(updateMovies(response.data.results));
    }
    return (
        <>
            <Hero/>
            <Movies title="Now Playing Movies" />
        </>

    );
}

export default NowPlaying;