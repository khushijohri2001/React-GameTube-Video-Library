import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { Link, useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import "../styles/homepage.css"
import "../root.css"
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";
import { useFilter } from "../context/filterContext";

const Homepage = () =>{
    const [sidebar, setSidebar] = useState(true);
    const { token } = useAuth();
    const navigate =  useNavigate();
    const { videoState, getWatchLater, removeWatchLater, getLikes, removeLikes, getHistory, deleteVideoFromPlaylist, createPlaylist, addVideoToPlaylist } = useVideo();
    const { videos, categories } = videoState;    
    const { filterState, filterDispatch, filteredVideos } = useFilter();   
    const [ playlistModal, setPlaylistModal] = useState(false);     
    const [newPlaylist, setNewPlaylist] = useState("");    
    const [ currentVideo, setCurrentVideo ] = useState({}) 

    
   
const userloginCheck = ( token, video ) =>{
    if(token) {
        setPlaylistModal(true)
        var curr = videoState.videos.find((singleVideo) => singleVideo._id === video._id)
        setCurrentVideo(curr)
    }
    else{
        navigate("/login")
    }
}

const customStyle = {
    overlay: {
      backgroundColor: "rgba(52, 58, 64, 0.8)",
    },
    content: {
      width: "18rem",
      margin: "5rem auto",
      backgroundColor: "#12191d",
      color : "#a0b2b9",
      textAlign : "center"
    },
  };

const videoExistInPlaylist = (playlist) => playlist.videos.some((video) => video._id === currentVideo._id);

const addNewVideoToPlaylist = (currentVideo, playlist) => {
    videoExistInPlaylist(playlist) ? deleteVideoFromPlaylist(currentVideo._id, playlist._id, token) : addVideoToPlaylist(currentVideo, playlist._id, token);
}
 
const createNewPlaylist = (playlistName, token) => {
    playlistName && createPlaylist(playlistName, token);
    setNewPlaylist("");
}

const watchLaterHandler = (token, video) =>{
videoState.watchLater.some((item) => item._id === video._id) ?
removeWatchLater(token, video._id) : getWatchLater(token, video)
}


const likesHandler = (token, video) =>{
videoState.liked.some((item) => item._id === video._id) ?
removeLikes(token, video._id) : getLikes(token, video)
}

return (
<div className="App">
    <Navbar sidebar={sidebar} setSidebar={setSidebar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <div className="right-body">
            <div className="chips">
                <ul className="category-list">
                    <li className="list-item" onClick={()=>filterDispatch({type : "CLEAR_FILTER", payload : {...filterState.allVideos}})}>All</li>
                    {categories.map((category)=>(

                    <li className="list-item" onClick={(e)=>filterDispatch({type : "CATEGORY", payload : category.categoryName})}>{category.categoryName}</li>

                    ))}
                </ul>
            </div> 
            <div className="video-list">

                {filteredVideos(videos, filterState).map((video)=>(
                <article className="video-card" key={video._id}>
                    <Link to={`/homepage/${video._id}`}>
                    <img src={video.cover} alt="" className="card-img" onClick={()=>getHistory(token, video)}/></Link>
                    <div className="content">
                        <div className="card-head">
                            <p className="title">{video.title}</p>
                        </div>
                        <p className="creator">{video.creator}</p>
                        <div className="views-date">
                            <span className="views">{video.views}</span>
                            <span className="date">{video.date}</span>
                        </div>
                        <div className="card-icons">
                        <button className="dp-btn" onClick={()=>likesHandler( token, video )}><i className="fas fa-thumbs-up card-icon"></i>{videoState.liked.some((item)=> item._id === video._id) ?
                                "Unlike" :
                                "Like"
                                }</button>
                    <button className="dp-btn" onClick={()=>watchLaterHandler( token, video )}><i className="fas fa-clock card-icon"></i>{ videoState.watchLater.some((item)=>item._id===video._id) ?
                                "Undo Watch Later" :
                                "Watch Later"
                                }</button>
                    <button className="dp-btn" onClick={()=> userloginCheck(token, video)}><i className="fas fa-list card-icon"></i>Playlist</button>
                        </div>
                    </div>
                </article>
                ))}
            </div>
        </div>
        {
            playlistModal && (
                <Modal isOpen={playlistModal} style={customStyle}>
                    <header className="views-date">
                        <h3>Playlist Name</h3>
                        <i className="fas fa-times dp-btn" onClick={() => setPlaylistModal(false)}></i>
                    </header>
                    <section>
                        {videoState.playlists.length > 0 &&
                        videoState.playlists.map((playlist) => {
                        return (
                            <div key={playlist._id}>
                                <input type="checkbox" checked={videoExistInPlaylist(playlist)} onChange={() =>{
                                addNewVideoToPlaylist( currentVideo, playlist)
                                }}/>
                                <span>{playlist.title}</span>
                            </div>
                            );
                        })}
                    </section>
                    <main>
                        <label>Name </label>
                        <input 
                            className="playlist-inp"
                            type="text"
                            value={newPlaylist}
                            onChange={(e) => setNewPlaylist(e.target.value)}/>
                    </main>
                    <button className="dp-btn right-end" onClick={() => createNewPlaylist(newPlaylist, token)}>
                        Create
                    </button>
                </Modal>
            )
        }
    </main>
</div>
);
}

export { Homepage }