import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import { useAuth } from "../context/authContext.js";


const Sidebar = () =>{
    const { logoutHandler } = useAuth();
    return (
        <aside className="sidebar-items">
            <ul className="items">
                <NavLink to="/homepage" className="link-style">
                <li className="side-item"><span><i className="fas fa-compass"></i></span>Explore</li>
                </NavLink>
                
                <NavLink to="/playlists" className="link-style">
                <li className="side-item"><span><i className="fas fa-list"></i></span>Playlists</li>
                </NavLink>
                
                <NavLink to="/liked" className="link-style">
                <li className="side-item"><span><i className="fas fa-thumbs-up"></i></span>Liked Videos</li>
                </NavLink>
                <NavLink to="/watchLater" className="link-style">
                <li className="side-item"><span><i className="fas fa-clock"></i></span>Watch Later</li>
                </NavLink>
                <NavLink to="/history" className="link-style">
                <li className="side-item"><span><i className="fas fa-history"></i></span>History</li>
                </NavLink>
                <NavLink to="/" className="link-style">
                <li className="side-item" onClick={logoutHandler}><span><i className="fas fa-sign-out"></i></span>Logout</li>
                </NavLink>
            </ul>
        </aside>
    );
}

export { Sidebar }