import axios from "axios";
import { useAuth } from "../context/authContext"


const getVideos = async () =>{
    try {
        const response = await axios({
            method : "get",
            url: "/api/videos",
        });
    
        if (response.status === 200) return response.data
      } catch (error) {
        console.error(error.response);
      }
}
const getCategories = async () =>{
    try {
        const response = await axios({
            method : "get",
            url: "/api/categories",
        });
    
        if (response.status === 200) return response.data
      } catch (error) {
        console.error(error.response);
      }
}



const getHistoryVideos = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method : "get",
            url : "/api/user/history",
            headers : { authorization : token }
        });
        if(response.status === 200)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}


const getWatchLaterVideos = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method : "get",
            url : "/api/user/watchlater",
            headers : { authorization : token }
        });
        if(response.status === 200)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

const postHistoryVideos = async ( token, video ) =>{
    try{
        const response = await axios({
            method : "post",
            url  : "/api/user/history",
            data : { video } ,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }

    }
    catch(error){
        console.log(error)
    }
}

const postWatchLaterVideos = async ( token, video ) =>{
    try{
        const response = await axios({
            method : "post",
            url  : "/api/user/watchlater",
            data : { video } ,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }
    }
    catch(error){
        console.log(error)
    }
}


const removeHistoryVideos = async ( token, _id) =>{
    try {
        const response = await axios({
            method : "delete",
            url : `/api/user/history/${_id}`,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }
    }
    catch(error){
        console.log(error)
    }
}

const removeWatchLaterVideos = async ( token, _id) =>{
    try {
        const response = await axios({
            method : "delete",
            url : `/api/user/watchlater/${_id}`,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }
    }
    catch(error){
        console.log(error)
    }
}
const clearHistoryVideos = async ( token ) =>{
    try {
        const response = await axios({
            method : "delete",
            url : "/api/user/history/all",
            headers: { authorization : token }
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }
    }
    catch(error)
    {
        console.log(error)
    }   
}      
          

const getLikedVideos = async () =>{
    const { token } = useAuth();
    try { 
        const response = await axios.get("/api/user/likes", { headers : { authorization : token }})
        if(response.status === 200) return response.data
    }
    catch(error){
        console.log(error.response)
    }
}

const postLikedVideos = async ( token, video) =>{
    try{
        const response = await axios.post("/api/user/likes", { video }, { headers : { authorization : token}})
        if(response.status === 200 || response.status === 201) return response.data
    }
    catch(error){
        console.log(error.response)
    }
}

const  removeLikedVideos = async ( token, _id) =>{
    try {
        const response = await axios({
            method : "delete",
            url : `/api/user/likes/${_id}`,
            headers : { authorization : token },
        })
        if(response.status === 200 || response.status === 201){
            return response.data
        }
    }
    catch(error){
        console.log(error)
    }
}

const getAllPlaylists = async () => {
    const { token } = useAuth();
    try { 
        const response = await axios.get("/api/user/playlists", { headers : { authorization : token }})
        if(response.status === 200) return response.data
    }
    catch(error){
        console.log(error.response)
    }
}

const makeNewPlaylist = async ( playlistName, token ) =>{
    try{
        const response = await axios.post("/api/user/playlists", 
          {
            playlist: {
              title: playlistName,
              description: "",
            },
          },
          {
            headers : { authorization : token}
          } 
          )
        if(response.status === 200 || response.status === 201) return response.data
    }
    catch(error){
        console.log(error.response)
    }
}

const getVideosFromPlaylist = async () => {
    const { token } = useAuth();
    try { 
        const response = await axios({
            method : "get",
            url : `/api/user/playlists/`
        }).get("/api/user/playlists/", { headers : { authorization : token }})
        if(response.status === 200) return response.data
    }
    catch(error){
        console.log(error.response)
    }
}
const deleteCompletePlaylist = async ( playlistID, token) =>{
    try {
        const response = await axios({
            method : "delete",
            url : `/api/user/playlists/${playlistID}`,
            headers : { authorization : token }
        })
        if(response.status === 200 || response.status === 201) 
            return response.data
    }
    catch(error){
        console.log(error.response)
    }
}

const addToPlaylist = async (video, playlistID, token ) =>{
    try {
        const response = await axios({
            method : "post",
            headers : { authorization : token },
            data : { video },
            url : `/api/user/playlists/${playlistID}`,
        })
        if(response.status === 200 || response.status === 201)
            return response.data
    }
    catch(error) {
        console.log(error.response)
    }
}

const deleteFromPlaylist = async ( videoID, playlistID, token ) =>{
    try{
        const response = await axios({
            method : "delete",
            headers : { authorization : token },
            url : `/api/user/playlists/${playlistID}/${videoID}`
        })
        if(response.status === 200 || response.status === 201) 
            return response.data
    }
    catch(error){
        console.log(error.response)
    }
}


export { getVideos, getCategories, getLikedVideos, postLikedVideos, removeLikedVideos, getWatchLaterVideos, postWatchLaterVideos, removeWatchLaterVideos, getHistoryVideos, postHistoryVideos, removeHistoryVideos, clearHistoryVideos, getAllPlaylists, getVideosFromPlaylist, makeNewPlaylist, deleteCompletePlaylist, addToPlaylist, deleteFromPlaylist}

