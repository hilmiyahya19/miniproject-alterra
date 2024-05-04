import { useSelector } from "react-redux";
import Movie from "../Movie/Movie";
import PropTypes from 'prop-types';
import { Container, MoviesSection, MoviesTitle, MovieContainer } from './Movies.styled'; // Import styled-components

function Movies(props) {
  // Destructing props: state movies
  const { title} = props;

  const movies = useSelector((store) => store.movies.movies);

  return (
    <div>
      <Container>
      <MoviesSection>
        <MoviesTitle>{title}</MoviesTitle>
        <MovieContainer>
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={{...movie, id: parseInt(movie.id)}}/>;
          })}
        </MovieContainer>
      </MoviesSection>
    </Container>
    </div>
  );
}

Movies.propTypes = {
  title: PropTypes.string.isRequired
};

export default Movies;