import { memo } from "react";
import { useNavigate } from "react-router-dom";

import type { SearchAnime } from "../types/anime";
import WatchlistButton from "./anime/WatchlistButton";

interface AnimeResultCardProps {
    anime: SearchAnime;
}

function AnimeResultCard({ anime }: AnimeResultCardProps) {
    const navigate = useNavigate();

    const {
        title,
        image,
        year,
        status,
        episodes,
        genres,
        score,
    } = anime;

    const openDetail = () => {
        navigate(`/detail/${anime.id}`);
    };

    return (
        <article
            className="
                group flex min-w-0 flex-col overflow-hidden
                rounded-xl border border-white/10
                bg-(--color-surface)
                transition duration-200
                hover:-translate-y-1
                hover:border-(--color-primary)/40
                hover:shadow-lg hover:shadow-black/20
                sm:flex-row
            "
        >
            <button
                type="button"
                onClick={openDetail}
                aria-label={`View details for ${title}`}
                className="
                    relative block w-full shrink-0 overflow-hidden
                    bg-(--color-surface-elevated)
                    focus-visible:outline-2
                    focus-visible:-outline-offset-2
                    focus-visible:outline-(--color-primary)
                    sm:w-32 md:w-36 lg:w-40
                "
            >
                <div className="aspect-3/4 w-full sm:h-full sm:aspect-auto sm:min-h-56">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            className="
                                h-full w-full object-cover
                                transition-transform duration-300
                                group-hover:scale-105
                            "
                        />
                    ) : (
                        <div className="flex h-full min-h-40 items-center justify-center px-3 text-center text-sm text-(--color-text-subtle)">
                            No image available
                        </div>
                    )}
                </div>
            </button>

            <div className="flex min-w-0 flex-1 flex-col p-4">
                <header>
                    <button
                        type="button"
                        onClick={openDetail}
                        className="
                            line-clamp-2 text-left text-base
                            font-semibold leading-snug
                            text-(--color-text)
                            transition-colors
                            hover:text-(--color-primary)
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-(--color-primary)
                        "
                    >
                        {title}
                    </button>

                    <p className="mt-2 text-xs leading-relaxed text-(--color-text-muted)">
                        {year ?? "Unknown year"}
                        <span className="mx-2 text-(--color-text-subtle)">•</span>
                        {status ?? "Unknown status"}
                    </p>
                </header>

                {(episodes != null || score != null) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {episodes != null && (
                            <span className="rounded-md border border-white/10 bg-white/4 px-2 py-1 text-xs text-(--color-text-muted)">
                                {episodes} {episodes === 1 ? "episode" : "episodes"}
                            </span>
                        )}

                        {score != null && (
                            <span className="rounded-md border border-(--color-rating)/20 bg-(--color-rating)/10 px-2 py-1 text-xs font-medium text-(--color-rating)">
                                ★ {score}
                            </span>
                        )}
                    </div>
                )}

                {genres.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {genres.slice(0, 4).map((genre) => (
                            <span
                                key={genre}
                                className="
                                    rounded-md border
                                    border-(--color-primary)/15
                                    bg-(--color-primary)/5
                                    px-2 py-1 text-[0.65rem]
                                    text-(--color-text-muted)
                                "
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-4 sm:mt-auto sm:pt-4">
                    <WatchlistButton
                        anime={anime}
                        showLabel
                    />
                </div>
            </div>
        </article>
    );
}

export default memo(AnimeResultCard);