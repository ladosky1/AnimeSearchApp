import { useQuery } from "@tanstack/react-query";

import {
    getDiscovery,
    getGenreAnime,
    searchAnime,
    previewAnime,
    detailAnime
} from "../api/backend";

export function useDiscoveryQuery() {
    return useQuery({
        queryKey: ["anime", "discovery"],
        queryFn: getDiscovery
    });
}

export function useGenreAnimeQuery(
    genre: string, page = 1, perPage = 20
) {
    return useQuery({
        queryKey: ["anime", "genre", genre, page, perPage],
        queryFn: () => getGenreAnime(genre, page, perPage),
        enabled: Boolean(genre)
    });
}

export function useSearchAnimeQuery(
    query: string,
    page = 1,
    perPage = 20
) {
    return useQuery({
        queryKey: ["anime", "search", query, page, perPage],
        queryFn: () => searchAnime(query, page, perPage),
        enabled: Boolean(query?.trim())
    });
}

export function usePreviewAnimeQuery(query: string) {
    return useQuery({
        queryKey: ["anime", "preview", query],
        queryFn: () => previewAnime(query),
        enabled: Boolean(query?.trim())
    });
}

export function useAnimeDetailQuery(id: number) {
    return useQuery({
        queryKey: ["anime", "detail", id],
        queryFn: () => detailAnime(id),
        enabled: Number.isInteger(id) && id > 0,
    });
}