import styled from "styled-components";

const StyledHero = styled.div`
  margin: 5rem auto;
  padding: 1rem;

  section {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .hero__left {
    margin-bottom: 1rem;
  }

  h2 {
    color: #4361ee;
    margin-bottom: 1rem;
    font-size: 2.44rem;
  }

  h3 {
    color: #b5179e;
    margin-bottom: 1rem;
    font-size: 1.59rem;
  }

  p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 25px;
    padding-top: 1rem;
    margin: 0 auto; /* Gambar berada di tengah pada semua layar */
    display: block; /* Mengatasi margin auto agar berfungsi */
  }

  /* Medium Screen */
  @media (min-width: 768px) {
    section {
      flex-direction: column; /* Mengubah tata letak menjadi kolom */
      align-items: center; /* Pusatkan elemen */
      text-align: center; /* Pusatkan teks */
    }

    .hero__left {
      flex-basis: 100%; /* Mengambil lebar penuh */
      margin-bottom: 2rem; /* Beri jarak antara elemen */
    }
  }

  /* Large Screen */
  @media (min-width: 992px) {
    section {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      text-align: left;
    }

    .hero__left {
      flex-basis: 40%;
      margin-bottom: 0; /* Hilangkan margin bottom */
    }
  }
`;

export default StyledHero;
