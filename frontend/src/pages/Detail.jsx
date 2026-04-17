import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useWatchlist } from '../context/WatchlistContext';
import { detailAnime } from '../api/backend';
import DOMPurify from 'dompurify';


function Detail(){
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");
    const {add, remove, isInWatchlist} = useWatchlist();
    const inWatchlist = anime ? isInWatchlist(anime.id) : false;

    const navigate = useNavigate();

    useEffect(() => {
        if(!id){
            toast.error("Invalid Anime Id");
            setLoading(false);
            return;
        }
        async function loadAnime(){
            try {
                setLoading(true);
                const data = await detailAnime(Number(id));
                if(!data){
                    throw new Error("Anime Not found");
                }
                setAnime(data);
            } catch (err) {
                setError("Failed to load anime details.");
            } finally {
                setLoading(false);
            }
        }

        loadAnime();
    }, [id]);

    const handleToggle = async () => {
        if (btnLoading) return;

        try {
            setBtnLoading(true);
            if(inWatchlist){
                await remove(anime.id, navigate);
                toast.success("Removed from Watchlist");
            } else {
                await add(anime, navigate);
                toast.success("Added to Watchlist");
            }
        } finally {
            setBtnLoading(false);
        }
    }

    function DetailSkeleton(){
        return(
            <div className='flex flex-col lg:flex:row gap-10 animate-pulse'>
                <div className='w-[240px] h-[320px] bg-white/10 rounded-base'>
                    
                    <div className='flex-1 space-y-3'>
                        <div className='h-6 bg-white/10 rounded w-2/3'></div>
                        <div className='h-4 bg-white/10 rounded w-1/2'></div>
                        <div className='h-4 bg-white/10 rounded w-1/3'></div>
                        <div className='h-4 bg-white/10 rounded w-2/3'></div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className='px-4 md:px-8 py-6 max-w-6xl mx-auto'>
            {loading ? (
                <DetailSkeleton />
            ) : error ? (
                <p className='text-pink text-sm'>
                    {error}
                </p>
            ) : !anime ? null : (
                <>
                    <div className='flex flex-col lg:flex-row gap-10 items-start mb-12'>
                        <img 
                            src={anime.image} 
                            alt={anime.title}
                            className='w-[240px] lg:w-[300px] flex-shrink-0 rounded-base shadow-lg mx-auto lg:mx-0' />
                        
                        <div className='flex flex-col flex-1 max-w-2xl'>
                            <h1 className='text-2xl md:text-3xl font-semibold mb-3'>
                                {anime.title}
                            </h1>
                            <div className='flex flex-wrap gap-2 mb-4 text-xs'>
                                <span className='px-2 py-1 bg-white/5 rounded-base'>
                                    {anime.year || "Unknown Year"}
                                </span>
                                <span className='px-2 py-1 bg-white/5 rounded-base'>
                                    {anime.status}
                                </span>
                                <span className='px-2 py-1 bg-white/5 rounded-base'>
                                    {anime.episodes ? `${anime.episodes} eps` : "Ongoing"}
                                </span>
                                <span className='px-2 py-1 bg-white/5 rounded-base'>
                                    ⭐ {anime.score || "N/A"}
                                </span>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-4'>
                                {anime.genres.map(g => (
                                    <span 
                                        key={g}
                                        className='text-xs px-2 py-1 rounded-full bg-pink text-bgDark font-medium'>
                                        {g}
                                    </span>
                                ))}
                            </div>
                            <button
                                disabled={btnLoading}
                                aria-pressed={inWatchlist} 
                                className='w-fit px-4 py-2 rounded-base bg-cyan text-bgDark
                                            text-sm font-medium transition hover:opacity-90
                                            disabled:opacity-50 disabled:cursor-not-allowed'
                                onClick={handleToggle}>
                                {btnLoading 
                                    ? 'updating...' 
                                    : inWatchlist ?
                                    'Remove from watchlist' 
                                    : 'add to watchlist'}
                            </button>
                        </div>
                    </div>
                    
                    <div className='grid gap-10 lg:grid-cols-2'>
                        <div>
                            <h2 className='text-lg font-semibold mb-2'>
                                Description
                            </h2>
                            <div 
                                className='text-sm text-textMuted leading-relaxed space-y-2 [&_br]:hidden'
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(anime.description)}}/>
                        </div>

                        <div>
                            {anime.trailer ? (
                                <div className='w-full aspect-video rounded-base overflow-hidden shadow-lg'>
                                    <iframe
                                        src={anime.trailer.embedUrl}
                                        title='Anime Trailer'
                                        className='w-full h-full'
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <p className='w-full h-[200px] bg-white/5 rounded-base
                                            flex flex-col items-center justify-center text-sm text-textMuted'>
                                    <span className='text-lg mb-1'>🎬</span>
                                    No trailer available.
                                </p>
                            )}
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default Detail