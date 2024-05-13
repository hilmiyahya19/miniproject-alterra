import { createSlice } from "@reduxjs/toolkit";
import dataMovie from "../../utils/constants/dataMovie";

const moviesSlice = createSlice({
    name: "Movies Slice",
    initialState: {
        movies:dataMovie,
    },
    reducers: {
         /**
         * action punya akses ke state movies dan digunakan untuk mengambil data yang dikirimkan lewat reducer
         * state.movies ditimpa nilai nya dengan data yang dikirimkan nanti ketika mengambil reducer
         * misal mengirim movies popular, movies popular masuk ke action.payload kemudian menimpa state.movies
         * otomatis nilai dari movies bukan dari local, tapi dari api
         */
        updateMovies(state, action){
            state.movies = action.payload;
        },
    },
});

// generate action dan reducers
const { updateMovies } = moviesSlice.actions;
const moviesReducer = moviesSlice.reducer;

export { updateMovies };
export default moviesReducer;