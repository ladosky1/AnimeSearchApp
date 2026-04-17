import { fetchAnilist } from "./anilistService.js";
import { SEARCH_QUERY, CATEGORIES_QUERY, PREVIEW_QUERY, DETAIL_QUERY} from "../graphql/animeQueries.js";

export async function getAnimeCategories(topLimit = 10, genreLimit = 10){

    const data = await fetchAnilist(CATEGORIES_QUERY, {topLimit, genreLimit});
    
    function normalize(list){
        return list.map(anime => ({
            id: anime.id,
            title: anime.title.romaji,
            image: anime.coverImage.large,
            year: anime.startDate.year,
            status: anime.status,
        }));
    }

    return {
        top: normalize(data.top.media),
        action: normalize(data.action.media),
        adventure: normalize(data.adventure.media),
        isekai: normalize(data.isekai.media)
    }
}

export async function searchAnimeService(query){
    
    const data = await fetchAnilist(SEARCH_QUERY, { search: query });

    return data.Page.media.map(anime => ({
        id: anime.id,
        title: anime.title.romaji,
        image: anime.coverImage.large,
        year: anime.startDate.year,
        episodes: anime.episodes,
        genres: anime.genres,
        score: anime.averageScore
    }));
}

export async function previewAnimeService(query){
    
    const data = await fetchAnilist(PREVIEW_QUERY, {search: query});

    return data.Page.media.map(anime => ({
        id: anime.id,
        title: anime.title.romaji,
        image: anime.coverImage.medium,
        year: anime.startDate.year
    }))
}

export async function detailAnimeService(id){
    
    const data = await fetchAnilist(DETAIL_QUERY, {id: Number(id)});
    const anime = data.Media;

    let trailer = null;

    if(anime.trailer && anime.trailer.site === "youtube"){
        trailer = {
            id: anime.trailer.id,
            thumbnail: anime.trailer.thumbnail,
            embedUrl: `https://www.youtube.com/embed/${anime.trailer.id}`
        };
    }

    return {
        id: anime.id,
        title: anime.title.romaji,
        image: anime.coverImage.extraLarge,
        description: anime.description,
        year: anime.startDate.year,
        status: anime.status,
        episodes: anime.episodes,
        genres: anime.genres,
        score: anime.averageScore,
        trailer
    };
}