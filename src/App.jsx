import { ThemeProvider } from "styled-components"
import Layout from './components/Layout/Layout'
import theme from "./utils/constants/theme";
import { Route, Routes } from "react-router-dom";
import PublicRoute from './routes/PublicRoute/PublicRoute';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';
import Login from './pages/PublicPage/Login';
import Logout from './pages/PrivatePage/Logout';
import NotFound from './pages/NotFound/NotFound';
import Home from "./pages/PublicPage/Home";
import Movie from "./pages/PublicPage/movie";
import Popular from "./pages/PublicPage/movie/Popular";
import NowPlaying from "./pages/PublicPage/movie/NowPlaying";
import Upcoming from "./pages/PublicPage/movie/Upcoming";
import TopRated from "./pages/PublicPage/movie/TopRated";
import Content from "./pages/PublicPage/Content";
import Chat from "./pages/PublicPage/Chat";
import About from "./pages/PublicPage/About";
import Registration from "./pages/PublicPage/Registration";
import Dashboard from "./pages/PrivatePage/Dashboard";
import Create from "./pages/PrivatePage/Create";
import Detail from "./pages/PublicPage/movie/Detail";
import Update from "./pages/PrivatePage/Update";
import Delete from "./pages/PrivatePage/Delete";
import UploadVideo from "./pages/PrivatePage/UploadVideo";

function App() {
  // Cek apakah pengguna sudah terautentikasi
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <>
      <ThemeProvider  theme={theme}>
        <Layout>
          <Routes>
          {/* Route "/" untuk menampilkan Home atau Dashboard */}
          <Route path="/" element={
              isAuthenticated === "true" ? <Dashboard /> : <Home />
            } />
          {/* Public routes */}
            <Route path="/" element={<PublicRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/movie/" element={<Movie />} />
              <Route path="/movie/popular" element={<Popular />} />
              <Route path="/movie/now-playing" element={<NowPlaying />} />
              <Route path="/movie/upcoming" element={<Upcoming />} />
              <Route path="/movie/top-rated" element={<TopRated />} />
              <Route path="/movie/:id" element ={<Detail />}></Route>
              <Route path="/content" element={<Content />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Route> 
          {/* Private routes */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/create" element={<Create/>} />
              <Route path="/update" element={<Update/>} />
              <Route path="/delete" element={<Delete/>} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/upload-video" element={<UploadVideo/>} />
            </Route>
          {/* Not found */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
