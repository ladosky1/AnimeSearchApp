import { useState, memo } from "react";
import toast from "react-hot-toast";
import { Plus, X, Spinner} from "phosphor-react";

function AnimeResultCard({ anime, watchlistToggle, isInWatchlist, onOpenDetail }){
    if(!anime) return null;

    const {
        title,
        image,
        year,
        status,
        episodes, 
        genres,
        score,
    } = anime;
    const [loading, setLoading] = useState(false);
    const [optimisticState, setOptimisticState] = useState(null);

    const currentState = optimisticState !== null ? optimisticState : isInWatchlist;

    return(
        <article className="bg-[#111827] border-l-4 border-transparent rounded-base
                            overflow-hidden shadow-lg transition-all duration-200
                            flex-col hover:-translate-y-1 hover:border-cyan hover:shadow-xl
                            md:flex-row md:gap-2 md:min-h-[160px]">
            <div className="flex justify-center items-center overflow-hidden m-3
                            rounded-base cursor-pointer md:m-0 md:flex-[0_0_40%]"
                onClick={() => onOpenDetail?.(anime)}>
                <img 
                    src={image} 
                    alt={title} 
                    loading="lazy"
                    className="h-[280px] max-w-full object-cover rounded-base
                                shadow-md md:h-full md:w-full"/>
            </div>

            <div className="flex flex-col flex-1 p-3 md:p-2 justify-center">
                <header>
                    <h3 
                        className="text-[1.1rem] mb-1 text-cyan cursor-pointer line-clamp-2"
                        onClick={() => onOpenDetail?.(anime)}>
                        {title}
                    </h3>

                    <span className="text-[0.8rem] text-textMuted">
                        {year || "UnKnown"} &bull; {status}
                    </span>
                </header>

                <div className="mt-2 flex flex-wrap gap-2 text-[0.8rem]">
                    {episodes && 
                        <span className="bg-pink text-bgDark px-2 py-0.5 rounded-base text-[0.7rem]">
                            {episodes} eps
                        </span>}
                    {score && 
                        <span className="bg-pink text-bgDark px-2 py-0.5 rounded-base text-[0.7rem]"> 
                            ⭐ {score}
                        </span>}
                </div>

                {genres?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 mb-2">
                        {genres.slice(0, 4).map(genre => (
                            <span 
                                className="bg-cyan text-bgDark px-2 py-0.5 rounded-base text-[0.7rem]"
                                key={genre}>
                                {genre}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto md:mt-2">
                    <button 
                        className="bg-cyan text-bgDark rounded-base px-3
                                    py-1 text-[0.8rem] transition hover:bg-pink
                                    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={async () => {
                            if(loading) return;
                            
                            const nextState = !currentState;

                            try {
                                setLoading(true);
                                setOptimisticState(nextState);

                                toast.success(
                                    nextState ? "Added to Watchlist" : "Removed from Watchlist"
                                )

                                await watchlistToggle(anime);
                            } catch (err) {
                                setOptimisticState(null);

                                if(err.message?.includes("auth")){
                                    toast.error("Login To add to watchlist")
                                } else {
                                    toast.error("Something failed");
                                }
                            } finally {
                                setLoading(false);
                                setOptimisticState(null);
                            }
                        }}>
                            <span className="flex items-center gap-1 justify-center">
                                {loading ? (
                                    <Spinner size={26} className="animate-spin"/>
                                ) : currentState ? (
                                    <>
                                        <X size={16}/> Remove
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16}/> Add
                                    </>
                                )}
                            </span>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default memo(AnimeResultCard);