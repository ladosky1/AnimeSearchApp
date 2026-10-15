import type { AnimeDetail } from "../../types/anime";
import WatchlistButton from "../anime/WatchlistButton";

interface DetailHeroProps {
    anime: AnimeDetail;
}

function DetailHero({ anime }: DetailHeroProps) {
    const title =
        anime.title.english ||
        anime.title.romaji ||
        anime.title.native ||
        "Unknown Title";

    const watchlistAnime = {
        id: anime.id,
        title,
        image: anime.image,
        year: anime.year,
        status: anime.status,
    };

    const rating =
        typeof anime.score === "number" && anime.score > 0
            ? (anime.score / 10).toFixed(1)
            : null;

    const metadata = [
        anime.year ? String(anime.year) : null,
        anime.season && anime.seasonYear
            ? `${anime.season} ${anime.seasonYear}`
            : null,
        anime.status?.replaceAll("_", " ") ?? null,
        anime.episodes ? `${anime.episodes} Episodes` : null,
        anime.duration ? `${anime.duration} Min/Ep` : null,
    ].filter((item): item is string => Boolean(item));

    return (
        <section className="
            relative isolate overflow-hidden
            rounded-2xl border border-white/10
            bg-white/[0.025]
        ">
            {/* Atmospheric banner background */}
            {anime.bannerImage && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20"
                >
                    <img
                        src={anime.bannerImage}
                        alt=""
                        className="
                            h-full w-full object-cover
                            object-center opacity-25
                        "
                    />
                </div>
            )}

            {/* Dark overlay for readability */}
            <div
                aria-hidden="true"
                className="
                    absolute inset-0 -z-10
                    bg-linear-to-r
                    from-(--color-bg)/95
                    via-(--color-bg)/85
                    to-(--color-bg)/65
                "
            />

            <div className="p-3 sm:p-6 md:p-8 lg:p-10">
                {/* Main desktop columns; compact mobile header */}
                <div className="
                    grid grid-cols-[104px_minmax(0,1fr)]
                    items-start gap-4
                    sm:grid-cols-[160px_minmax(0,1fr)]
                    sm:gap-6
                    md:grid-cols-[220px_minmax(0,1fr)]
                    md:gap-8
                    lg:grid-cols-[280px_minmax(0,1fr)]
                    lg:gap-10
                ">
                    {/* Poster */}
                    <div className="min-w-0">
                        <div className="
                            overflow-hidden rounded-xl
                            border border-white/10
                            shadow-2xl shadow-black/40
                        ">
                            {anime.image ? (
                                <img
                                    src={anime.image}
                                    alt={`${title} poster`}
                                    className="
                                        aspect-3/4 w-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <div className="
                                    flex aspect-3/4 items-center
                                    justify-center bg-white/5
                                    p-2 text-center text-xs
                                    text-(--color-text-muted)
                                ">
                                    Poster unavailable
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Information column */}
                    <div className="min-w-0">
                        <p className="
                            mb-2 text-[10px] font-semibold
                            uppercase tracking-[0.18em]
                            text-(--color-primary)
                            sm:mb-3 sm:text-xs
                        ">
                            Anime details
                        </p>

                        <h1 className="
                            text-lg font-bold leading-tight
                            tracking-tight text-(--color-text)
                            sm:text-2xl lg:text-4xl
                        ">
                            {title}
                        </h1>

                        {anime.title.romaji &&
                            anime.title.romaji !== title && (
                                <p className="
                                    mt-2 text-xs
                                    text-(--color-text-muted)
                                    sm:text-sm
                                ">
                                    {anime.title.romaji}
                                </p>
                            )}

                        {/* Rating */}
                        <div className="mt-4 sm:mt-5">
                            {rating ? (
                                <div className="
                                    inline-flex items-center gap-2
                                    rounded-xl border
                                    border-amber-300/20
                                    bg-amber-300/10
                                    px-2.5 py-2 sm:px-3
                                ">
                                    <span
                                        aria-hidden="true"
                                        className="text-amber-300"
                                    >
                                        ★
                                    </span>

                                    <span className="
                                        text-base font-bold
                                        tabular-nums
                                        text-(--color-text)
                                        sm:text-lg
                                    ">
                                        {rating}
                                    </span>

                                    <span className="
                                        text-xs
                                        text-(--color-text-muted)
                                    ">
                                        / 10
                                    </span>
                                </div>
                            ) : (
                                <span className="
                                    text-xs
                                    text-(--color-text-muted)
                                ">
                                    No rating available
                                </span>
                            )}
                        </div>

                        {/* Desktop metadata: stays beside the poster */}
                        {metadata.length > 0 && (
                            <div className="
                                mt-5 hidden flex-wrap gap-2
                                lg:flex
                            ">
                                {metadata.map((item) => (
                                    <span
                                        key={item}
                                        className="
                                            rounded-full border
                                            border-white/10
                                            bg-black/25
                                            px-3 py-1.5
                                            text-xs font-medium
                                            capitalize
                                            text-(--color-text-muted)
                                        "
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Desktop genres */}
                        {anime.genres.length > 0 && (
                            <div className="mt-6 hidden lg:block">
                                <h2 className="
                                    mb-3 text-xs font-semibold
                                    uppercase tracking-wider
                                    text-(--color-text-muted)
                                ">
                                    Genres
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    {anime.genres.map((genre) => (
                                        <span
                                            key={genre}
                                            className="
                                                rounded-full
                                                border
                                                border-(--color-primary)/25
                                                bg-(--color-primary)/8
                                                px-3 py-1.5
                                                text-xs font-medium
                                                text-(--color-primary)
                                            "
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile metadata: full width below the top row */}
                {metadata.length > 0 && (
                    <div className="
                        mt-5 flex flex-wrap gap-2
                        lg:hidden
                    ">
                        {metadata.map((item) => (
                            <span
                                key={item}
                                className="
                                    rounded-full border
                                    border-white/10
                                    bg-black/25
                                    px-2.5 py-1.5
                                    text-[10px] font-medium
                                    capitalize
                                    text-(--color-text-muted)
                                    sm:text-xs
                                "
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}

                {/* Mobile genres */}
                {anime.genres.length > 0 && (
                    <div className="mt-5 lg:hidden">
                        <h2 className="
                            mb-2 text-[10px] font-semibold
                            uppercase tracking-wider
                            text-(--color-text-muted)
                            sm:text-xs
                        ">
                            Genres
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {anime.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="
                                        rounded-full
                                        border
                                        border-(--color-primary)/25
                                        bg-(--color-primary)/8
                                        px-3 py-1.5
                                        text-[11px] font-medium
                                        text-(--color-primary)
                                        sm:text-xs">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Watchlist action */}
                <div className="
                    mt-6 border-t border-white/10
                    pt-4 sm:pt-5">
                    <div className="w-full sm:max-w-xs">
                        <WatchlistButton
                            anime={watchlistAnime}
                            showLabel
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetailHero;