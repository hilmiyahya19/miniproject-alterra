import styled from "styled-components";

const StyledDetailMovie = styled.div`
  // Mobile Screen
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
  img {
    border-radius: 25px;
    max-width: 100%;
    height: auto;
  }
  h2 {
    font-size: 2.44rem;
    margin-bottom: 0.5rem;
    color: blue;
  }
  h3 {
    font-size: 1.59rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
  p {
    text-align: justify;
    margin-bottom: 2rem;
    color: #64748b;
  }
  // Medium Screen: 768px
  @media screen and (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    padding-top: 2rem;
    padding-left: 3rem;
    .poster {
      flex-basis: 30%;
    }
    .info {
      flex-basis: 60%;
    }
  }
  // Large Screen
  @media screen and (min-width: 992px) {
    padding-top: 2rem;
    padding-left: 6rem;
  }
`;

export default StyledDetailMovie;