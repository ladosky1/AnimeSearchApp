export interface Anime {
    id: number;
    title: string;
    image: string | null;
    year: number | null;
    status: string | null;
}

export interface Character {
    id: number;
    name: string;
    image: string | null;
    role: string | null;
    voiceActors: VoiceActor[];
}

export interface VoiceActor {
    id: number;
    name: string;
    image: string | null;
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

export function normalizeAnime(
    anime: any,
    imageSize: "medium" | "large" | "extraLarge" = "large"
): Anime {
    return {
        id: anime.id,
        title: anime.title?.romaji ?? "Unknown title",
        image: anime.coverImage?.[imageSize] ?? null,
        year: anime.startDate?.year ?? null,
        status: anime.status ?? null
    };
}

export function normalizeCharacter(characterEdge: any): Character {
    const character = characterEdge.node;

    return {
        id: character.id,
        name: character.name?.full ?? "Unknown character",
        image: character.image?.large ?? null,
        role: characterEdge.role ?? null,
        voiceActors:
            characterEdge.voiceActors?.map((voiceActor: any) => ({
                id: voiceActor.id,
                name: voiceActor.name?.full ?? "Unknown voice actor",
                image: voiceActor.image?.large ?? null
            })) ?? []
    };
}

export function normalizeRelation(relationEdge: any): Relation {
    const anime = relationEdge.node;

    return {
        id: anime.id,
        type: anime.type,
        relationType: relationEdge.relationType,
        title: anime.title?.romaji ?? "Unknown title",
        image: anime.coverImage?.medium ?? null,
        year: anime.startDate?.year ?? null,
        status: anime.status ?? null
    };
}