import { useState } from "react";
import {
    FiPlus,
    FiCheck,
    FiLoader,
} from "react-icons/fi";

import type { Anime } from "../../types/anime";
import { useWatchlist } from "../../context/WatchlistContext";

interface WatchlistButtonProps {
    anime: Anime;
    showLabel?: boolean;
}

function WatchlistButton({
    anime,
    showLabel = false,
}: WatchlistButtonProps) {
    const {
        add,
        remove,
        isInWatchlist,
    } = useWatchlist();

    const [loading, setLoading] = useState(false);

    const isSaved = isInWatchlist(anime.id);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        if (loading) return;

        setLoading(true);

        try {
            if (isSaved) {
                remove(anime.id);
            } else {
                add(anime);
            }
        } finally {
            setLoading(false);
        }
    };

    if (showLabel) {
        return (
            <button
                type="button"
                onClick={handleClick}
                disabled={loading}
                className="
                flex w-full items-center justify-center
                rounded-base
                bg-cyan text-bgDark
                px-3 py-2.5
                text-xs sm:text-sm
                font-medium
                transition
                hover:bg-pink
                active:scale-[0.99]
                disabled:opacity-50
                disabled:cursor-not-allowed">
                <span className="flex items-center gap-1.5">
                    {loading ? (
                        <FiLoader
                            size={15}
                            className="animate-spin"
                        />
                    ) : isSaved ? (
                        <>
                            <FiCheck size={15} />
                            In Watchlist
                        </>
                    ) : (
                        <>
                            <FiPlus size={15} />
                            Add to Watchlist
                        </>
                    )}
                </span>
            </button>
        );
    }

    return (
        <button
            type="button"
            aria-label={
                isSaved
                    ? `Remove ${anime.title} from watchlist`
                    : `Add ${anime.title} to watchlist`
            }
            disabled={loading}
            onClick={handleClick}
            className="
                absolute right-2 top-2 z-20
                grid h-8 w-8 place-items-center
                rounded-full
                border border-white/20
                bg-black/75 text-white
                shadow-lg backdrop-blur-md
                opacity-100
                transition-all duration-200
                hover:border-(--color-primary)
                hover:text-(--color-primary)
                hover:shadow-[0_0_12px_rgba(24,217,255,0.3)]
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-50">
            {loading ? (
                <FiLoader
                    size={18}
                    className="animate-spin"
                />
            ) : isSaved ? (
                <FiCheck size={18} />
            ) : (
                <FiPlus size={18} />
            )}
        </button>
    );
}

export default WatchlistButton;