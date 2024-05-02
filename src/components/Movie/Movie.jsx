import StyledMovie from "./Movie.styled";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Component Movie menerima props
function Movie(props) {
  // Melakukan destructing props
  const { movie } = props;

  return (
    <StyledMovie>
      <img
        src={movie.poster || `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
  }
        alt={movie.title}
      />
      <Link to = {`/movie/${movie.id}`}>
      <h3>{movie.title}</h3>
      </Link>
      
      <p>{movie.year || movie.release_date}</p>
    </StyledMovie>
  );
}

Movie.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster: PropTypes.string, // Optional
      poster_path: PropTypes.string, // Optional
      title: PropTypes.string.isRequired,
      year: PropTypes.string, // Optional
      release_date: PropTypes.string // Optional
    }).isRequired
  };

export default Movie;