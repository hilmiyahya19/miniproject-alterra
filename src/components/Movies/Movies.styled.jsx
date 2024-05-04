import styled from 'styled-components';

export const Container = styled.div`
  padding: 4rem;
`;

export const MoviesSection = styled.section`
  text-align: center;
`;

export const MoviesTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 2.44rem;
  color: #4361ee;
`;

export const MovieContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 767px) {
    align-items: center;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;
