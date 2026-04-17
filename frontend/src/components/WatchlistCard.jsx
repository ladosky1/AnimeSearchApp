import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner} from "phosphor-react";

function WatchlistCard({ anime, onRemove}){
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return(
        <div className="flex gap-4 bg-bgLight rounded-base
                        p-2 items-center transition-all duration-200
                        hover:-translate-y-1 hover:shadow-xl md:flex-row
                        flex-col text-center md:text-left ">
            <img 
                src={anime.image} 
                alt={anime.title}
                className="w-[120px] h-[170px] object-cover rounded-base flex-shrink-0
                            md:w-[120px] md:h-[170px]"/>
            
            <div className="flex flex-col flex-1 w-full">

                <div className="min-h-[60px]">
                    <h3 className="text-[1rem] leading-snug text-textMain line-clamp-2">
                        {anime.title}
                    </h3>
                    <span className="text-[0.75rem] text-textMuted mt-1 block">
                        {anime.status === 
                                "CURRENTLY AIRING" ? 
                                "Currently Airing" : 
                                anime.year || "Unknown Year"}
                    </span>
                </div>
                
                <div className="mt-auto w-full">
                    <div className="flex gap-2 mt-2 w-full justify-center
                                    md:justify-start">
                        <button
                            className="flex-1 text-[0.75rem] px-2 py-1 rounded-base bg-cyan
                                        text-bgDark font-medium transition hover:opacity-90"
                            onClick={() => navigate(`/detail/${anime.animeId}`)}>
                            View Details
                        </button>

                        <button
                            className="flex-1 text-[0.75rem] px-2 py-1 rounded-base
                                        border border-pink text-pink font-medium
                                        transition hover:bg-pink hover:text-bgDark
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                            onClick={async () => {
                                if(loading) return;

                                try {
                                    setError(null);
                                    setLoading(true);

                                    await onRemove(anime.animeId);
                                } catch (err) {
                                    if(err.message.includes("auth")){
                                        setError("Login Required");
                                    } else {
                                        setError("Failed To Remove")
                                    }
                                } finally{
                                    setLoading(false);
                                }
                            }}>
                                <span className="flex items-center justify-center gap-1">
                                    {loading ? (
                                        <Spinner size={16} className="animate-spin"/>
                                    ) : <>Remove</>}
                                </span>
                        </button>
                    </div>
                </div>
                {error && (
                <p className="text-[0.7rem] text-pink mt-1">
                    {error}
                </p>)}
            </div>
        </div>
    )

}

export default WatchlistCard