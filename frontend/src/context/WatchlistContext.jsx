import { useState, useEffect, useContext, createContext } from "react";
import { getWatchlist, deleteWatchlist, addToWatchlist } from "../api/backend";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }){
    const {user} = useAuth();

    const [watchlistIds, setWatchlistIds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!user){
            setWatchlistIds([]);
            return;
        }

        const fetchWatchlist = async () => {
            try {
                setLoading(true);
                const list = await getWatchlist();
                const ids = list.map(item => item.animeId);
                setWatchlistIds(ids);
            } catch (err) {
                console.error(err.message);
            } finally{
                setLoading(false);
            }
        }

        fetchWatchlist();
    }, [user]);

    const add = async (anime, navigate) => {
        try {
            await addToWatchlist({
                animeId: anime.id,
                title: anime.title,
                image: anime.image,
                year: anime.year
            });

            setWatchlistIds(prev => [...prev, anime.id]);
        } catch (err) {
            if(err.message === "UNAUTHORIZED"){
                navigate("/login");
            }else{
                console.error(err.message);
            }
        }
    }

    const remove = async (animeId, navigate) => {
        try {
            await deleteWatchlist(animeId);

            setWatchlistIds(prev => 
                prev.filter(id => id !== animeId)
            )
        } catch (err) {
            if(err.message === "UNAUTHORIZED"){
                navigate("/login");
            }else{
                console.error(err.message);
            }
        }
    }

    const isInWatchlist = (id) => {
        return watchlistIds.includes(id);
    };

    return(
        <WatchlistContext.Provider value={{watchlistIds, add, remove, isInWatchlist, loading}}>
            {children}
        </WatchlistContext.Provider>
    )
}

export function useWatchlist(){
    return useContext(WatchlistContext);
}