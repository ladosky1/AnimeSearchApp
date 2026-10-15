import { useDiscoveryQuery } from "../queries/animeQueries";
import AnimeSection from "../components/anime/AnimeSection";
import GenreDiscovery from "../components/anime/GenreDiscovery";
import Hero from "../components/Hero";

function Home() {
    const {
        data,
        isLoading,
        isError,
    } = useDiscoveryQuery();

    return (
        <main  className="pb-12">
            <Hero />

            <section
                id="discover"
                className="
                    relative z-10 mt-4
                    space-y-12 px-4 pb-8
                    md:mt-5 md:space-y-14 md:px-8">
                <AnimeSection
                    title="Trending Anime"
                    animeList={data?.trending}
                    loading={isLoading}
                    error={isError}/>

                <AnimeSection
                    title="Popular Anime"
                    animeList={data?.popular}
                    loading={isLoading}
                    error={isError}
                />

                <AnimeSection
                    title="Currently Airing"
                    animeList={data?.airing}
                    loading={isLoading}
                    error={isError}
                />

                <AnimeSection
                    title="Top Rated"
                    animeList={data?.topRated}
                    loading={isLoading}
                    error={isError}
                />

                <GenreDiscovery />
            </section>
        </main>
    );
}

export default Home;