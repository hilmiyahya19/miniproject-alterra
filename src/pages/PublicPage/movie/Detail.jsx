import { useParams } from "react-router-dom";
import DetailMovie from "../../../components/DetailMovie/DetailMovie";
import { useEffect } from "react";
import axios from "axios";
import Movies from "../../../components/Movies/Movies";
import ENDPOINTS from "../../../utils/constants/endpoint";
import { useDispatch } from "react-redux";
import { updateMovies } from "../../../features/moviesSlice";

function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch();

    //jalankan useEffect
    useEffect(() => {
        getRecommendationMovies();
    },[id]);


   //membuat fungsi
   async function getRecommendationMovies(){

    const response = await axios(ENDPOINTS.RECOM(id)); 
    dispatch(updateMovies(response.data.results));
   }


    return(
        <div>
            <DetailMovie/>
            <Movies title="Recommendations Movie"/>
        </div>
    );
}

export default Detail;