import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Anime } from "../types/anime";
import type {
    WatchlistAnime,
    WatchlistContextValue,
} from "../types/watchlist";

const WATCHLIST_KEY = "animelad-watchlist";

const WatchlistContext =
    createContext<WatchlistContextValue | null>(null);

interface WatchlistProviderProps {
    children: ReactNode;
}

export function WatchlistProvider({
    children,
}: WatchlistProviderProps) {
    const [watchlist, setWatchlist] = useState<WatchlistAnime[]>(() => {
        try {
            const stored = localStorage.getItem(WATCHLIST_KEY);

            if (!stored) return [];

            const parsed = JSON.parse(stored) as Anime[];

            return parsed.map((anime) => ({
                ...anime,
                note:
                    "note" in anime &&
                    typeof anime.note === "string"
                        ? anime.note
                        : "",
            }));
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                WATCHLIST_KEY,
                JSON.stringify(watchlist)
            );
        } catch (error) {
            console.error("Failed to save watchlist:", error);
        }
    }, [watchlist]);

    const add = (anime: Anime) => {
        setWatchlist((prev) => {
            if (prev.some((item) => item.id === anime.id)) {
                return prev;
            }

            return [...prev, { ...anime, note: "" }];
        });
    };

    const remove = (animeId: number) => {
        setWatchlist((prev) =>
            prev.filter((anime) => anime.id !== animeId)
        );
    };

    const updateNote = (animeId: number, note: string) => {
        setWatchlist((prev) =>
            prev.map((anime) =>
                anime.id === animeId
                    ? { ...anime, note }
                    : anime
            )
        );
    };

    const isInWatchlist = (animeId: number) =>
        watchlist.some((anime) => anime.id === animeId);

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                add,
                remove,
                updateNote,
                isInWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist(): WatchlistContextValue {
    const context = useContext(WatchlistContext);

    if (!context) {
        throw new Error(
            "useWatchlist must be used within a WatchlistProvider"
        );
    }

    return context;
}