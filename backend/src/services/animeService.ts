import AppError from "../errors/AppError.js";
import { fetchAnilist } from "./anilistService.js";
import {
    DISCOVER_QUERY,
    GENRE_QUERY,
    SEARCH_QUERY,
    PREVIEW_QUERY,
    DETAIL_QUERY
} from "../graphql/animeQueries.js";
import {
    normalizeAnime,
    normalizeCharacter,
    normalizeRelation
} from "../utils/animeNormalizer.js";

import type { 
    DiscoveryResponse,
    GenreResponse,
    SearchResponse,
    PreviewResponse,
    DetailResponse
} from "../types/animeTypes.js";

const allowedRelationTypes = [
    "PREQUEL",
    "SEQUEL",
    "SIDE_STORY",
    "ALTERNATIVE"
];

export async function getAnimeDiscoveryService(
    trendingPage = 1,
    popularPage = 1,
    airingPage = 1,
    topRatedPage = 1,
    perPage = 10
) {
    const data = await fetchAnilist<DiscoveryResponse>(
        DISCOVER_QUERY,
        {
            trendingPage,
            popularPage,
            airingPage,
            topRatedPage,
            perPage
        }
    );

    return {
        trending: data.trending.media.map(anime =>
            normalizeAnime(anime)
        ),

        popular: data.popular.media.map(anime =>
            normalizeAnime(anime)
        ),

        airing: data.airing.media.map(anime =>
            normalizeAnime(anime)
        ),

        topRated: data.topRated.media.map(anime =>
            normalizeAnime(anime)
        )
    };
}

export async function getAnimeByGenre(
    genre: string,
    page = 1,
    perPage = 20
) {
    const data = await fetchAnilist<GenreResponse>(
        GENRE_QUERY,
        {
            genre,
            page,
            perPage
        }
    );

    return {
        anime: data.Page.media.map(anime => ({
            ...normalizeAnime(anime),
            score: anime.averageScore ?? null
        })),

        pageInfo: data.Page.pageInfo
    };
}

export async function searchAnimeService(
    query: string,
    page = 1,
    perPage = 20
) {
    const data = await fetchAnilist<SearchResponse>(
        SEARCH_QUERY,
        {
            search: query,
            page,
            perPage
        }
    );

    return {
        anime: data.Page.media.map(anime => ({
            ...normalizeAnime(anime),
            episodes: anime.episodes ?? null,
            genres: anime.genres ?? [],
            score: anime.averageScore ?? null
        })),

        pageInfo: data.Page.pageInfo
    };
}

export async function previewAnimeService(query: string) {
    const data = await fetchAnilist<PreviewResponse>(
        PREVIEW_QUERY,
        {
            search: query
        }
    );

    return data.Page.media.map(anime =>
        normalizeAnime(anime, "medium")
    );
}

export async function detailAnimeService(id: number) {
    const data = await fetchAnilist<DetailResponse>(
        DETAIL_QUERY,
        {
            id
        }
    );

    const anime = data.Media;

    if (!anime) {
        throw new AppError("Anime not found", 404);
    }

    let trailer = null;

    if (anime.trailer?.site === "youtube") {
        trailer = {
            id: anime.trailer.id,
            thumbnail: anime.trailer.thumbnail,
            embedUrl: `https://www.youtube.com/embed/${anime.trailer.id}`
        };
    }

    return {
        id: anime.id,

        title: {
            romaji: anime.title?.romaji ?? null,
            english: anime.title?.english ?? null,
            native: anime.title?.native ?? null
        },

        image: anime.coverImage?.extraLarge ?? null,
        bannerImage: anime.bannerImage ?? null,

        description: anime.description ?? null,

        year: anime.startDate?.year ?? null,
        season: anime.season ?? null,
        seasonYear: anime.seasonYear ?? null,

        status: anime.status ?? null,

        episodes: anime.episodes ?? null,
        duration: anime.duration ?? null,

        score: anime.averageScore ?? null,
        meanScore: anime.meanScore ?? null,

        genres: anime.genres ?? [],

        tags: anime.tags?.filter(
            tag => !tag.isMediaSpoiler
        ) ?? [],

        studios: anime.studios?.nodes
            ?.filter(studio => studio.isAnimationStudio) ?? [],

        trailer,

        nextAiringEpisode: anime.nextAiringEpisode ?? null,

        characters: anime.characters?.edges
            .map(normalizeCharacter) ?? [],

        relations: anime.relations?.edges
            ?.filter(
                relation =>
                    relation.node?.type === "ANIME" &&
                    allowedRelationTypes.includes(
                        relation.relationType
                    )
            )
            .map(normalizeRelation) ?? []
    };
}