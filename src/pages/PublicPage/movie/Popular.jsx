import { useEffect } from "react";
import axios from "axios";
import ENDPOINTS from "../../../utils/constants/endpoint";
import { useDispatch } from "react-redux";
import { updateMovies } from "../../../features/moviesSlice";
import Movies from "../../../components/Movies/Movies";
import Hero from "../../../components/Hero/Hero"

function Popular () {
    //membuat dispatch
    const dispatch = useDispatch() 

    useEffect(() => {
        getPopularMovies();
    }, []);
  
    async function getPopularMovies(){
            // Fetch data dari axios
            const response = await axios(ENDPOINTS.POPULAR);
            dispatch(updateMovies(response.data.results));
    }
    return (
        <>
            <Hero/>
            <Movies title="Popular Movies" />
        </>

    );
}

export default Popular;