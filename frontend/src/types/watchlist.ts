import type { Anime } from "./anime";

export type WatchlistAnime = Anime & {
    note: string;
};

export interface WatchlistContextValue {
    watchlist: WatchlistAnime[];

    add: (anime: Anime) => void;

    remove: (animeId: number) => void;

    updateNote: (animeId: number, note: string) => void;

    isInWatchlist: (animeId: number) => boolean;
}