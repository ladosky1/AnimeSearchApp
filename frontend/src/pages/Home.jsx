import { useState, useEffect } from 'react'
import { getCategories } from '../api/backend';
import CategoryRow from '../components/Category';


function Home() {

    const [heroVisible, setHeroVisible] = useState(false);
    const [popularAnime, setPopularAnime] = useState([]);
    const [actionAnime, setActionAnime] = useState([]);
    const [adventureAnime, setAdventureAnime] = useState([]);
    const [isekaiAnime, setIsekaiAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadAll() {
           try{ 
                const result = await getCategories(10, 10);
                setPopularAnime(result.top);
                setActionAnime(result.action);
                setAdventureAnime(result.adventure);
                setIsekaiAnime(result.isekai);
            }catch(err){
                setError("Failed to Load Anime. Please Refresh the page!!");
            }
            finally {setLoading(false);}
        };
        loadAll();
        setHeroVisible(true)
    }, [])

    return(
        <main className='px-4 md:px-8 py-6 space-y-12'>          
            <section 
                className={`relative overflow-hidden rounded-base text-center
                            py-16 px-2 transition-all duration-700
                            ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className='absolute inset-0 bg-[url("/src/assets/animebg.jpg")] bg-cover bg-center opacity-30'/>

                <div className='absolute inset-0 bg-black/10'/>

                <div className='relative z-10 space-y-3'>
                    <h3 className='text-2xl md:text-3xl font-semibold text-cyan'>
                        Welcome to aNiMeLad🌀
                    </h3>
                    <p className='text-sm md:text-base text-textMuted max-w-md mx-auto'>
                        Discover and create a watchlist for your favourite anime
                    </p>
                </div>
            </section>

            <section className='space-y-10'>
                <CategoryRow 
                    title="Popular Anime"
                    animeList={popularAnime}
                    loading={loading}
                    error={error} />
                <CategoryRow 
                    title="Action Filled Anime"
                    animeList={actionAnime}
                    loading={loading}
                    error={error} />
                <CategoryRow 
                    title="Adventure Anime"
                    animeList={adventureAnime}
                    loading={loading}
                    error={error} />
                <CategoryRow 
                    title="Isekai Anime"
                    animeList={isekaiAnime}
                    loading={loading}
                    error={error} />
            </section>
        </main>
    )
}

export default Home