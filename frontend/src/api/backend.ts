import type {
    Anime,
    AnimeDetail,
    SearchAnime,
} from "../types/anime";

export interface PageInfo {
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    perPage: number;
    total: number;
}

export interface DiscoveryResponse {
    trending: Anime[];
    popular: Anime[];
    airing: Anime[];
    topRated: Anime[];
}

export interface GenreResponse {
    anime: SearchAnime[];
    pageInfo: PageInfo;
}

export interface SearchResponse {
    anime: SearchAnime[];
    pageInfo: PageInfo;
}

const API_BASE = import.meta.env.VITE_API_URL;

export async function getDiscovery(): Promise<DiscoveryResponse> {
    const response = await fetch(`${API_BASE}/anime/discovery`);

    if (!response.ok) {
        throw new Error("Failed to fetch anime discovery");
    }

    return response.json();
}

export async function getGenreAnime(
    genre: string,
    page = 1,
    perPage = 20
): Promise<GenreResponse> {
    const response = await fetch(
        `${API_BASE}/anime/genres/${encodeURIComponent(genre)}?page=${page}&perPage=${perPage}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch genre anime");
    }

    return response.json();
}

export async function searchAnime(
    query: string,
    page = 1,
    perPage = 20
): Promise<SearchResponse> {
    const response = await fetch(
        `${API_BASE}/anime/search?q=${encodeURIComponent(query)}&page=${page}&perPage=${perPage}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch anime");
    }

    return response.json();
}

export async function previewAnime(query: string): Promise<Anime[]> {
    const response = await fetch(
        `${API_BASE}/anime/preview?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch anime");
    }

    return response.json();
}

export async function detailAnime(id: number): Promise<AnimeDetail> {
    const response = await fetch(`${API_BASE}/anime/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch anime");
    }

    return response.json();
}