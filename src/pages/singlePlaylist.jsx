import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { Link, useParams } from "react-router-dom";
import "../styles/homepage.css"
import "../root.css";
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";

const SinglePlaylist = () =>{

    const [sidebar, setSidebar] = useState(true);
    const { playlistID } = useParams();
    const { token } = useAuth();
    const { videoState, getWatchLater, removeWatchLater, getLikes, removeLikes, getHistory, deleteVideoFromPlaylist } = useVideo();
    const { playlists } = videoState;

    const currentPlaylist = playlists.filter((playlist) => playlist._id === playlistID)[0];

    const watchLaterHandler = (token, video) =>{
        videoState.watchLater.some((item) => item._id === video._id) ?
        removeWatchLater(token, video._id) : getWatchLater(token, video)
        }
        
        
        const likesHandler = (token, video) =>{
        videoState.liked.some((item) => item._id === video._id) ?
        removeLikes(token, video._id) : getLikes(token, video)
        }

    return(
        <div className="App">
            <Navbar sidebar={sidebar} setSidebar={setSidebar} />
            <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <div className="right-body">
            <div className="video-list">
        {currentPlaylist.videos.length > 0 && currentPlaylist.videos.map((video) => <article className="video-card" key={video._id}>
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
                    <button className="dp-btn" onClick={()=>deleteVideoFromPlaylist( video._id, playlistID, token )}><i className="fas fa-trash card-icon"></i>Trash</button>
                        </div>
                    </div>
                </article>)}
            </div>
            </div>
            </main>
            
        </div>
    )
}

export { SinglePlaylist} 
