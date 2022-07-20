import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { Link } from "react-router-dom";
import "../styles/homepage.css"
import "../root.css";
import "../styles/playlists.css"
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";

const Playlist = () =>{
    const { videoState, deletePlaylist } = useVideo();
    const { playlists } = videoState;
    const { token } = useAuth();
    const [sidebar, setSidebar] = useState(true);

    const playlistCover = (playlist) => {
        return playlist.videos.length > 0 &&
           `https://i3.ytimg.com/vi/${playlist.videos[0]._id}/maxresdefault.jpg`
           ;
      }

    return(
        <div className="App">
            <Navbar sidebar={sidebar} setSidebar={setSidebar} />
            <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <div className="right-body">
            <div className="video-list">
            {playlists.length === 0 && <h2 className="no-playlist">No playlist to show</h2>}
            {playlists.length > 0 &&
             playlists.map((playlist)=> (

                <article className="video-card relative" key={playlist._id}>
                <Link to={`/playlists/${playlist._id}`}>
                    <img src={playlistCover(playlist)} className="card-img"/>
                </Link>
                <div className="video-count">
                    <p className="count">{playlist.videos.length}</p>
                </div>
                <div className="content">
                    <div className="views-date">
                        <p className="title">{playlist.title}</p>
                        <span className="trash-icon dp-btn" onClick={() => deletePlaylist(playlist._id, token)}><i className="fas fa-trash"></i></span>
                    </div>
                </div>
                </article>

            )
            ) 
            } 
            </div>
        </div>
        </main>
        </div>
    )
}

export { Playlist }