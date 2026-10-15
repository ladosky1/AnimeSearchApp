import { memo } from "react";
import { useNavigate } from "react-router-dom";

import type { Anime } from "../../types/anime";
import WatchlistButton from "./WatchlistButton";

interface AnimeCardProps {
    anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
    const navigate = useNavigate();

    const { id, title, image, year, status } = anime;

    const isAiring = status === "RELEASING";

    const metadata = isAiring
        ? "Currently airing"
        : year ?? "Year unknown";

    return (
        <article
            onClick={() => navigate(`/detail/${id}`)}
            className="
                group relative w-28 shrink-0 cursor-pointer
                sm:w-30 md:w-42 lg:w-44
                focus-within:outline-none">
            {/* Poster */}
            <div
                className="
                    relative aspect-2/3 overflow-hidden
                    rounded-xl border border-white/10
                    bg-(--color-surface)
                    transition-all duration-300
                    group-hover:-translate-y-1
                    group-hover:border-(--color-primary)/60
                    group-hover:shadow-[0_8px_28px_rgba(24,217,255,0.12)]">
                {image ? (
                    <img
                        src={image}
                        alt={`${title} poster`}
                        loading="lazy"
                        className="
                            h-full w-full object-cover
                            transition-transform duration-500
                            group-hover:scale-[1.04]"/>
                ) : (
                    <div
                        className="
                            flex h-full items-center justify-center
                            p-3 text-center text-sm
                            text-(--color-text-muted)">
                        {title}
                    </div>
                )}

                {/* Dark gradient for readable poster metadata */}
                <div
                    className="
                        pointer-events-none absolute inset-0
                        bg-linear-to-t
                        from-black/95 via-black/10 to-black/5
                        opacity-90
                        transition-opacity duration-300
                        group-hover:opacity-100"/>

                {/* Watchlist action */}
                <div
                    className="
                        absolute right-2 top-2 z-20"
                    onClick={(event) => event.stopPropagation()}>
                    <WatchlistButton anime={anime} />
                </div>

                {/* Poster information */}
                <div
                    className="
                        absolute inset-x-0 bottom-0 z-1
                        p-3">
                    <h3
                        className="
                            line-clamp-2 text-sm font-semibold
                            leading-snug text-white"
                        title={title}>
                        {title}
                    </h3>

                    <p className="mt-1.5 truncate text-xs text-white/70">
                        {metadata}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default memo(AnimeCard);