interface PageInfo {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    total?: number;
}

interface AnimeListItem {
    id: number;
    title: {
        romaji: string | null;
    };
    coverImage: {
        medium?: string | null;
        large?: string | null;
    };
    startDate: {
        year: number | null;
    };
    status: string | null;
    averageScore?: number | null;
    episodes?: number | null;
    genres?: string[];
}

export interface DiscoveryResponse {
    trending: {
        media: AnimeListItem[];
    };
    popular: {
        media: AnimeListItem[];
    };
    airing: {
        media: AnimeListItem[];
    };
    topRated: {
        media: AnimeListItem[];
    };
}

export interface GenreResponse {
    Page: {
        pageInfo: PageInfo;
        media: AnimeListItem[];
    };
}

export interface SearchResponse {
    Page: {
        pageInfo: PageInfo;
        media: AnimeListItem[];
    };
}

export interface PreviewResponse {
    Page: {
        media: AnimeListItem[];
    };
}

interface DetailAnime {
    id: number;

    title: {
        romaji: string | null;
        english: string | null;
        native: string | null;
    };

    coverImage: {
        extraLarge: string | null;
    };

    bannerImage: string | null;

    description: string | null;

    startDate: {
        year: number | null;
        month: number | null;
        day: number | null;
    };

    season: string | null;
    seasonYear: number | null;
    status: string | null;

    episodes: number | null;
    duration: number | null;

    averageScore: number | null;
    meanScore: number | null;

    genres: string[];

    tags: {
        id: number;
        name: string;
        rank: number;
        isMediaSpoiler: boolean;
    }[];

    studios: {
        nodes: {
            id: number;
            name: string;
            isAnimationStudio: boolean;
        }[];
    };

    trailer: {
        id: string;
        site: string;
        thumbnail: string | null;
    } | null;

    nextAiringEpisode: {
        airingAt: number;
        timeUntilAiring: number;
        episode: number;
    } | null;

    characters: {
        edges: {
            role: string;
            node: {
                id: number;
                name: {
                    full: string | null;
                };
                image: {
                    large: string | null;
                };
            };
            voiceActors: {
                id: number;
                name: {
                    full: string | null;
                };
                image: {
                    large: string | null;
                };
            }[];
        }[];
    };

    relations: {
        edges: {
            relationType: string;
            node: {
                id: number;
                type: string;
                title: {
                    romaji: string | null;
                };
                coverImage: {
                    medium: string | null;
                };
                startDate: {
                    year: number | null;
                };
                status: string | null;
            };
        }[];
    };
}

export interface DetailResponse {
    Media: DetailAnime | null;
}