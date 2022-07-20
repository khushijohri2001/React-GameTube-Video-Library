import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { Homepage } from "./pages/homepage";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Routes, Route } from "react-router-dom";
import { History } from "./pages/history";
import { Liked } from "./pages/liked";
import { Playlist } from "./pages/playlists";
import { WatchLater } from "./pages/watchLater";
import { Stream } from "./pages/stream";
import { SinglePlaylist } from "./pages/singlePlaylist";
import { PrivateRoute } from "./components/private.jsx";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        {/* Open Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage/:videoID" element={<Stream />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/history" element={<History />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/playlists/:playlistID" element={<SinglePlaylist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
