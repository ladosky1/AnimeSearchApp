import { useState } from "react";

import { useGenreAnimeQuery } from "../../queries/animeQueries";
import AnimeCard from "./AnimeCard";

const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sports",
    "Supernatural",
    "Thriller",
] as const;

function GenreDiscovery() {
    const [selectedGenre, setSelectedGenre] = useState("Action");

    const {
        data,
        isLoading,
        isError,
    } = useGenreAnimeQuery(selectedGenre);

    const anime = data?.anime ?? [];

    return (
        <section className="space-y-5">
            {/* Section heading */}
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight text-(--color-text) md:text-2xl">
                    Explore by Genre
                </h2>

                <p className="text-sm text-(--color-text-muted)">
                    Find your next anime by choosing a genre.
                </p>
            </div>

            {/* Genre selector */}
            <div
                className="
                    -mx-4 flex gap-2 overflow-x-auto
                    px-4 pb-1
                    sm:mx-0 sm:px-0
                    scrollbar-none
                    [&::-webkit-scrollbar]:hidden
                "
                aria-label="Choose an anime genre"
            >
                {genres.map((genre) => {
                    const isSelected = selectedGenre === genre;

                    return (
                        <button
                            key={genre}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setSelectedGenre(genre)}
                            className={`
                                shrink-0 rounded-full border
                                px-4 py-2 text-sm font-medium
                                transition-all duration-200
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-(--color-primary)
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-(--color-bg)
                                ${
                                    isSelected
                                        ? "border-(--color-primary) bg-(--color-primary)/15 text-(--color-primary) shadow-[0_0_18px_rgba(24,217,255,0.10)]"
                                        : "border-white/10 bg-white/3 text-(--color-text-muted) hover:border-white/20 hover:bg-white/[0.07] hover:text-(--color-text)"
                                }
                            `}
                        >
                            {genre}
                        </button>
                    );
                })}
            </div>

            {/* Anime results */}
            {isLoading ? (
                <div className="flex gap-4 overflow-hidden">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="
                                h-55 min-w-40 shrink-0
                                animate-pulse rounded-xl
                                border border-white/5
                                bg-white/4
                            "
                        />
                    ))}
                </div>
            ) : isError ? (
                <p className="rounded-xl border border-white/10 bg-white/3 px-4 py-5 text-sm text-(--color-text-muted)">
                    Couldn't load {selectedGenre} anime. Try selecting the genre again.
                </p>
            ) : anime.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-white/3 px-4 py-5 text-sm text-(--color-text-muted)">
                    No anime found for {selectedGenre}.
                </p>
            ) : (
                <div
                    className="
                        flex gap-4 overflow-x-auto
                        pb-2 scroll-smooth
                        scrollbar-thin
                        [scrollbar-color:rgba(24,217,255,0.35)_transparent]
                    "
                >
                    {anime.map((item) => (
                        <AnimeCard
                            key={item.id}
                            anime={item}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default GenreDiscovery;