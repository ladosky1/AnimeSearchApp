import AnimeCard from "./AnimeCard";
import { useCallback } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { useNavigate } from "react-router-dom";

function CategoryRow({title, animeList, loading, error}){
    
    const {add, remove, isInWatchlist } = useWatchlist();
    const navigate = useNavigate();

    const handleToggle = useCallback(async (animeItem) => {
        if(isInWatchlist(animeItem.id)){
            return await remove(animeItem.id, navigate);
        } else{
            return await add(animeItem, navigate);
        }
    }, [isInWatchlist, add, remove, navigate]);

    return(
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-lg md:text-xl font-semibold text-textMuted">
                    {title}
                </h2>

                <span className="text-xs text-textMuted">
                    {animeList?.length || 0} anime
                </span>
            </div>

            <div className="relative">
                
                <div className="pointer-events-none absolute left-0 top-0
                                h-full w-8 bg-gradient-to-r from-bgDark to-transparent z-10"/>

                <div className="pointer-events-none absolute right-0 top-0
                                h-full w-8 bg-gradient-to-l from-bgDark to-transparent z-10"/>
                
                <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth 
                                scrollbar-thin scrollbar-thumb-cyan/60 scrollbar-track-transparent">
                    {loading ? 
                                <div className="flex gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="min-w-[160px] h-[220px] bg-white/5 rounded-base animate-pulse"/>
                                    ))}
                                </div> :
                                animeList.map(anime => {
                                    return(
                                        <AnimeCard 
                                            key={anime.id} 
                                            anime={anime}
                                            onToggle={handleToggle}
                                            isInWatchlist={isInWatchlist(anime?.id)}/>
                                    )
                                })}
                </div>          
            </div>
            
            {error && (
                <p className="text-pink text-sm mt-2">
                    {error}
                </p>
            )} 
        </div>

    )
}

export default CategoryRow