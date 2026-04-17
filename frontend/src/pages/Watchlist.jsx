import WatchlistCard from '../components/WatchlistCard'
import { getWatchlist, deleteWatchlist } from '../api/backend';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Watchlist(){
    
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getWatchlist();
                setWatchlist(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRemove = async (animeId) => {
        try {
            await deleteWatchlist(animeId);
            setTimeout(() => {
                setWatchlist(prev => 
                    prev.filter(item => item.animeId !== animeId)
                );
            }, 250);
            toast.success("Anime removed from Watchlist");
        } catch (err) {
            console.error(err.message);
            toast.error("Could not remove anime: " + err.message);
        }
    }

    function EmptyWatchlist(){
        return(
            <div className='flex flex-col items-center justify-center mt-16 text-center'>
                <p className='text-lg text-textMuted mb-3'>
                    Your Watchlist is Empty
                </p>
                <p className='text-sm text-textMuted mb-4'>
                    Start adding anime to keep track of what you love
                </p>
            </div>
        )
    }

    function WatchlistSkeleton(){
        return(
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className='bg-bgLight rounded-base p-3 animate-pulse'>
                        <div className='w-full h-40 bg-white/10 rounded mb-3'></div>
                        <div className='h-4 bg-white/10 rounded w-3/4 mb-2'></div>
                        <div className='h-3 bg-white/10 rounded w-1/2'></div>
                    </div>
                ))}
            </div>
        )
    }

    return( 
        <div className='px-4 md:px-8 py-6 min-h-screen'>
            <div className='mb-6'>
                <h2 className='text-2xl md:text-3xl font-semibold text-cyan'>
                    My Watchlist
                </h2>
                <p className='text-sm text-textMuted mt-1'>
                    Your saved anime collection
                </p>
            </div>

            {loading ? (
                <WatchlistSkeleton/>
            ) : error ? (
                <p className='text-pink text-sm'>{error}</p>
            ) : watchlist.length === 0 ? (<EmptyWatchlist/>)
             : (
                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {watchlist.map(anime => (
                        <WatchlistCard
                            key={anime.animeId}
                            anime={anime}
                            onRemove={handleRemove}/>
                    ))}
                </div>
            )}   
        </div>
    )
}

export default Watchlist;