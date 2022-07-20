import { createContext, useReducer, useState, useContext } from "react";
import { useVideo } from "./videoContext";

const FilterContext = createContext();

const FilterProvider = ({children}) =>{
    const { videoState } = useVideo();
    const { videos } = videoState;
    const filterReducer = (filterState, action) =>{
        switch(action.type){
            case "CATEGORY" : 
            return {
                ...filterState,
                filterByCategory : action.payload,
            }
            
            case "CLEAR_FILTER" : 
            return {
                ...filterState,
                filterByCategory : "",
                allVideos : filterState.allVideos
            }

            default :
            return filterState
        }
    }

    const [filterState, filterDispatch] = useReducer(filterReducer, {
        filterByCategory : "",
        allVideos : [...videos]
    })



    const categoryFilter = (videos, filterOnCategory) =>{
        if(videos != [] || videos != "undefined"){
            const showVideos = [...videos];
            if (filterOnCategory != "") {
                const arr = showVideos.filter(
                    (item) => item.category === filterOnCategory)
                return arr;
            }
            return showVideos;
        }
    }

    const filteredVideos = (videos, filterState) =>{
        const { filterByCategory } = filterState;
        const filterCat = categoryFilter(videos, filterByCategory)
        return filterCat;
    }

    return (
        <FilterContext.Provider value={{filterState, filterDispatch, filteredVideos}}>{children}</FilterContext.Provider>
    );
}

const useFilter = () => useContext(FilterContext)

export { FilterProvider, useFilter}