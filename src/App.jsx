import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Trending from "./pages/Trending";
import Movie from "./pages/Movie";
import TvShow from "./pages/TvShow";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Moviedetails from "./pages/Moviedetails";
import Trailer from "./components/common/Trailer";
import Tvdetails from "./pages/Tvdetails";
import WishList from "./pages/WishList";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <div className="w-screen min-h-screen bg-black flex flex-col">
      <Navbar isScrolled={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/tvshow" element={<TvShow />} />
        <Route path="/tv/details/:id" element={<Tvdetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/wishlist"
          element={
            <SignedIn>
              <WishList />
            </SignedIn>
          }
        />
        <Route
          path="/wishlist"
          element={
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          }
        />

        <Route path="/sign-in" element={<SignInPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
