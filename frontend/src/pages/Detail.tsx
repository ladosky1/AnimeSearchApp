import { useParams } from "react-router-dom";

import { useAnimeDetailQuery } from "../queries/animeQueries";

import DetailHero from "../components/detail/DetailHero";
import DetailDescription from "../components/detail/DetailDescription";
import DetailTrailer from "../components/detail/DetailTrailer";
import DetailStudios from "../components/detail/DetailStudios";
import DetailCharacters from "../components/detail/DetailCharacters";
import DetailRelations from "../components/detail/DetailRelations";
import BackButton from "../components/BackButton";

function DetailSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row gap-10 animate-pulse">
            <div className="w-60 h-80 bg-white/10 rounded-base mx-auto lg:mx-0" />

            <div className="flex-1 space-y-3">
                <div className="h-6 bg-white/10 rounded w-2/3" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
                <div className="h-4 bg-white/10 rounded w-1/3" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
            </div>
        </div>
    );
}

function Detail() {
    const { id } = useParams();

    const {
        data: anime,
        isLoading,
        isError,
    } = useAnimeDetailQuery(Number(id));

    if (isLoading) {
        return (
            <main className="px-4 md:px-8 py-6 max-w-6xl mx-auto">
                <DetailSkeleton />
            </main>
        );
    }

    if (isError || !anime) {
        return (
            <main className="px-4 md:px-8 py-6 max-w-6xl mx-auto">
                <p className="text-pink text-sm">
                    Failed to load anime details.
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 md:px-8 lg:px-10">
            <div className="mb-5">
                <BackButton fallback="/" />
            </div>

            <DetailHero anime={anime} />

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
                <DetailDescription
                    description={anime.description}
                />

                <DetailTrailer
                    trailer={anime.trailer}
                />
            </div>

            <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
                <DetailStudios
                    studios={anime.studios}
                />

                <DetailCharacters
                    characters={anime.characters}
                />

                <DetailRelations
                    relations={anime.relations}
                />
            </div>
        </main>
    );
}

export default Detail;