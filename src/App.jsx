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
import Popular from "./pages/PublicPage/movie/Popular";
import NowPlaying from "./pages/PublicPage/movie/NowPlaying";
import Upcoming from "./pages/PublicPage/movie/Upcoming";
import TopRated from "./pages/PublicPage/movie/TopRated";
import Detail from "./pages/PublicPage/movie/Detail";
import Content from "./pages/PublicPage/Content";
import Chat from "./pages/PublicPage/Chat";
import About from "./pages/PublicPage/About";
import Registration from "./pages/PublicPage/Registration";
import Dashboard from "./pages/PrivatePage/Dashboard";
import Create from "./pages/PrivatePage/manage/Create";
import Update from "./pages/PrivatePage/manage/Update";
import Delete from "./pages/PrivatePage/manage/Delete";
import UploadVideo from "./pages/PrivatePage/upload/UploadVideo";
import UploadImage from "./pages/PrivatePage/upload/UploadImage";

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
              <Route path="manage/create" element={<Create/>} />
              <Route path="manage/update" element={<Update/>} />
              <Route path="manage/delete" element={<Delete/>} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/upload-video" element={<UploadVideo/>} />
              <Route path="/upload-image" element={<UploadImage/>} />
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
