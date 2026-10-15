export interface Anime {
    id: number;
    title: string;
    image: string | null;
    year: number | null;
    status: string | null;
}

export interface SearchAnime extends Anime {
    episodes: number | null;
    genres: string[];
    score: number | null;
}

export interface VoiceActor {
    id: number;
    name: string;
    image: string | null;
}

export interface Character {
    id: number;
    name: string;
    image: string | null;
    role: string | null;
    voiceActors: VoiceActor[];
}

export interface Relation {
    id: number;
    type: string;
    relationType: string;
    title: string;
    image: string | null;
    year: number | null;
    status: string | null;
}

export interface Studio {
    id: number;
    name: string;
    isAnimationStudio: boolean;
}

export interface Trailer {
    id: string;
    thumbnail: string | null;
    embedUrl: string;
}

export interface NextAiringEpisode {
    episode: number;
    airingAt: number;
    timeUntilAiring: number;
}

export interface AnimeDetail {
    id: number;

    title: {
        romaji: string | null;
        english: string | null;
        native: string | null;
    };

    image: string | null;
    bannerImage: string | null;
    description: string | null;

    year: number | null;
    season: string | null;
    seasonYear: number | null;
    status: string | null;

    episodes: number | null;
    duration: number | null;

    score: number | null;
    meanScore: number | null;

    genres: string[];

    tags: {
        id: number;
        name: string;
        description: string;
        rank: number;
        isMediaSpoiler: boolean;
    }[];

    studios: Studio[];

    trailer: Trailer | null;

    nextAiringEpisode: NextAiringEpisode | null;

    characters: Character[];

    relations: Relation[];
}