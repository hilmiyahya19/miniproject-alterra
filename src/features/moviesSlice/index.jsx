import { createSlice } from "@reduxjs/toolkit";
import dataMovie from "../../utils/constants/dataMovie";

// import createSlice
const moviesSlice = createSlice({
    name: "Movies Slice",
    initialState: {
        movies:dataMovie,
    },
    reducers: {
        addMovie(state, action) {
            state.movies.push(action.payload);
        },
        deleteMovie(){},
        updateMovies(state, action){
            state.movies = action.payload;
        },
    },
});

// generate action dan reducers
const { addMovie, deleteMovie , updateMovies} = moviesSlice.actions;
const moviesReducer = moviesSlice.reducer;

export {addMovie, deleteMovie, updateMovies};
export default moviesReducer;