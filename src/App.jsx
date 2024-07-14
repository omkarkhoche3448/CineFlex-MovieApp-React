import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Trending from "./pages/Trending";
import Movie from "./pages/Movie"
import TvShow from "./pages/TvShow";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Moviedetails from "./pages/Moviedetails";
import Trailer from "./components/common/Trailer";
import Tvdetails from "./pages/Tvdetails";

function App() {
  return (
    <>
      <div className="w-screen min-h-screen bg-black flex flex-col">
        <Navbar isScrolled={false} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

          <Route path="/trending" element={<Trending />} />

          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/details/:id" element={<Moviedetails />}>
            <Route
              path="/movie/details/:id/trailer"
              element={<Trailer />}
            />
          </Route>

          <Route path="/tvshow" element={<TvShow />} />
          <Route path="/tv/details/:id" element={<Tvdetails />}>
            <Route
              path="/tv/details/:id/trailer"
              element={<Trailer />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
