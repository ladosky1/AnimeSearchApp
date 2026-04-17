import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import AnimeResultCard from '../components/AnimeResultCard'
import { searchAnime } from '../api/backend'
import { useWatchlist } from '../context/WatchlistContext'


function Results(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const navigate = useNavigate();
    const { add, remove, isInWatchlist } = useWatchlist();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);   

    const handleOpenDetail = (anime) => {
        navigate(`/detail/${anime.id}`);
    }

    useEffect(() => {
        if (!query) return;

        async function loadResults(){
            try{
                setLoading(true);
                setError(null);
                const data = await searchAnime(query);
                setResults(data);
            }
            catch(err){
                setError("Failed to load results. Please try again.");            
            }
            finally{
                setLoading(false);
            }
        }

        loadResults();
    }, [query]);

    const handleToggle = useCallback(async (animeItem) => {
        if(isInWatchlist(animeItem.id)){
            return await remove(animeItem.id, navigate);
        } else{
            return await add(animeItem, navigate);
        }
    }, [isInWatchlist, add, remove, navigate]);

    function EmptyResults({ query }){
        return(
            <div className='flex flex-col items-center justify-center mt-16 text-center'>
                <p className='text-lg text-textMuted mb-3'>
                    No results found for "{query}"
                </p>
                <p className='text-sm text-textMuted'>
                    Try searching for something else
                </p>
            </div>
        )
    }

    function ResultsSkeleton(){
        return(
            <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className='bg-bgLight rounded-base p-3 animate-pulse'>
                        <div className='w-full h-48 bg-white/10 rounded mb-3'></div>
                        <div className='h-4 bg-white/10 rounded w-3/4 mb-2'></div>
                        <div className='h-3 bg-white/10 rounded w-1/2 mb-2'></div>
                        <div className='h-3 bg-white/10 rounded w-2/3'></div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className='px-4 md:px-8 py-6 min-h-screen'>

            <div className='mb-6'>
                <h2 className='text-2xl md:text-3xl font-semibold text-cyan'>
                    Results for "{query}"
                </h2>
                <p className='text-sm text-textMuted mt-1'>
                    Explore anime matching your search
                </p>
            </div>

            {loading ? (
                <ResultsSkeleton />
            ) : error ? (
                <p className='text-pink text-sm'>{error}</p>
            ) : results.length === 0 ? (
                <EmptyResults query={query} />
            ) : (
                <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {results.map(anime => (
                        <AnimeResultCard
                            key={anime.id}
                            anime={anime}
                            watchlistToggle={handleToggle}
                            isInWatchlist={isInWatchlist(anime?.id)}
                            onOpenDetail={handleOpenDetail}/>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default Results