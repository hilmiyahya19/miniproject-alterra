import { useState } from 'react';
import Hero from "../../components/Hero/Hero";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import Movie from '../../components/Movie/Movie';
import styled from "styled-components";

const StyledHome = styled.div`
  text-align: center;
  margin-top: 0;
  padding: 4rem;

  .movie {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  @media screen and (min-width: 768px) {
    .movie {
      flex-direction: row;
      justify-content: space-evenly;
      padding: 0rem;
    }
  }
`;

function Home() {
  const [searchResults, setSearchResults] = useState([]); // state untuk menyimpan hasil pencarian

  // fungsi untuk menangani hasil pencarian yang diperoleh dari komponen SearchMovie
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <Hero />
      <StyledHome>
      <SearchMovie onSearchResults={handleSearchResults} /> {/* mengirim fungsi handleSearchResults sebagai prop */}
      <div className='movie'>
        {searchResults.length > 0 && searchResults.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      </StyledHome>
    </>
  );
}

export default Home;
