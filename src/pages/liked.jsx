import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css";
import "../root.css";
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";

const Liked = () =>{
    const [sidebar, setSidebar] = useState(true);
    const { token } = useAuth();
    const { videoState, getWatchLater, removeWatchLater, getLikes, removeLikes }  = useVideo()
    const { liked } = videoState;

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
            <Navbar sidebar={sidebar} setSidebar={setSidebar}/>
            <main className="main-cont">
                {sidebar ? <Sidebar/> : null}
                <div className="right-body">
                    <div className="chips">
                        <h2 className="page-name">Liked Videos</h2>
                    </div>
                    <div className="video-list">
                    {liked.map((video)=>(
                            <article className="video-card">
                            <img src={video.cover} alt="" className="card-img"/>
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
                    <button className="dp-btn"><i className="fas fa-list card-icon"></i>Playlist</button>
                        </div>
                             </div>
                         </article>
                        ))}
                        
                    </div>
                </div>
            </main>
            
        </div>
    );
}
export { Liked }