import axios from 'axios';
import { useState } from 'react'; 
import ENDPOINTS from "../../utils/constants/endpoint";
import PropTypes from 'prop-types'; 

function SearchMovie({ onSearchResults }) {

  const [searchQuery, setSearchQuery] = useState(""); // state untuk menyimpan nilai input dari pengguna

  const handleSearch = async (e) => {
  e.preventDefault(); // mencegah pengiriman formulir secara default

  try {
    const response = await axios.get(ENDPOINTS.SEARCH_MOVIE, {
      params: {
        query: searchQuery // mengirim nilai input pencarian sebagai parameter 'query'
      }
    });

    console.log("Search results:", response.data);
    onSearchResults(response.data.results); // kirim hasil pencarian ke Home.jsx menggunakan props onSearchResults
  } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

    return (
      <>
        <form className="max-w-md mx-auto" onSubmit={handleSearch}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-6 ps-12 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search Movie" 
            required 
            value={searchQuery} // menghubungkan nilai input dengan state
            onChange={(e) => setSearchQuery(e.target.value)} // menangani perubahan nilai input
          />
          <button 
            type="submit" 
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}

SearchMovie.propTypes = {
    onSearchResults: PropTypes.func.isRequired 
};

export default SearchMovie;
