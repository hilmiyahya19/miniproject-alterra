import { useEffect } from "react";
import axios from "axios";
import ENDPOINTS from "../../../utils/constants/endpoint";
import { useDispatch } from "react-redux";
import { updateMovies } from "../../../features/moviesSlice";
import Movies from "../../../components/Movies/Movies";
import Hero from "../../../components/Hero/Hero"

function Upcoming () {
    //membuat dispatch
    const dispatch = useDispatch() 

    useEffect(() => {
        getUpcomingMovies();
    }, []);
  
    async function getUpcomingMovies(){
            // Fetch data dari axios
            const response = await axios(ENDPOINTS.UPCOMING);
            dispatch(updateMovies(response.data.results));
    }
    return (
        <>
            <Hero/>
            <Movies title="Upcoming Movies" />
        </>

    );
}

export default Upcoming;