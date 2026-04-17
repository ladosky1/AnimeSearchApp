import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, memo } from "react";
import { Plus, Check, Spinner} from "phosphor-react"

function AnimeCard({ anime, onToggle, isInWatchlist }){

    if(!anime) return null;

    const navigate = useNavigate();
    const {title, image, year, status} = anime;
    const [loading, setLoading] = useState(false);
    const [optimisticState, setOptimisticState] = useState(null);
    
    const currentState = optimisticState !== null ? optimisticState : isInWatchlist;
    const isAiring = status === "RELEASING";

    return(
        <div 
            className="mt-2 min-w-[160px] bg-bgLight rounded-base p-2
                        cursor-pointer transition-transform duration-200 
                        hover:-translate-y-1.5 
                        hover:shadow-[0_0_15px_var(--cyan)]"
            onClick={() => navigate(`/detail/${anime.id}`)}>
            <div className="relative overflow-hidden rounded-base group">
                <img 
                    src={image} 
                    alt={title}
                    loading="lazy"
                    className="w-full h-[220px] object-cover block" />
                <button
                    className="absolute bottom-2.5 right-2.5 
                                bg-bgLight text-cyan
                                border-none rounded-full w-[34px] h-[34px]
                                grid place-items-center
                                opacity-0 transition-all duration-200 group-hover:opacity-100
                                group-hover:scale-110 hover:shadow-[0_0_10px_var(--cyan)]
                                active: scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (loading) return;

                        const nextState = !currentState;

                        try {
                            setLoading(true);
                            setOptimisticState(nextState);

                            toast.success(
                                nextState ? "Added to Watchlist" : "Removed from Watchlist"
                            )

                            await onToggle(anime);
                        } catch (err) {
                            setOptimisticState(null);

                            if(err.message?.includes("auth")) {
                                toast.error("Login To add to watchlist");
                            } else {
                                toast.error("Something Failed");
                            }
                        } finally {
                            setLoading(false);
                            setOptimisticState(null);
                        }
                    }}>
                        {loading ? (
                            <Spinner size={18} className="animate-spin"/>
                            ) : currentState ? (
                                <Check size={18} weight="bold"/>
                            ) : (
                                <Plus size={18}/>
                            )}
                </button>
            </div>
            <h3 className="text-[0.75rem] text-textMuted ml-1">{title}</h3>
            <span className="text-[0.75rem] text-textMuted ml-1">
                {isAiring ? 'currently airing' : year || "unknown"}
            </span>
        </div>
    )
}

export default memo(AnimeCard); 