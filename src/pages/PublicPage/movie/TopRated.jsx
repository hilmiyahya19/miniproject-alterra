import { useEffect } from "react";
import axios from "axios";
import ENDPOINTS from "../../../utils/constants/endpoint";
import { useDispatch } from "react-redux";
import { updateMovies } from "../../../features/moviesSlice";
import Movies from "../../../components/Movies/Movies";
import Hero from "../../../components/Hero/Hero"

function TopRated () {
    //membuat dispatch
    const dispatch = useDispatch() 

    useEffect(() => {
        getTopRatedMovies();
    }, []);
  
    async function getTopRatedMovies(){
            // Fetch data dari axios
            const response = await axios(ENDPOINTS.TOPRATED);
            dispatch(updateMovies(response.data.results));
    }
    return (
        <>
            <Hero/>
            <Movies title="Top Rated Movies" />
        </>

    );
}

export default TopRated;