export const CATEGORIES_QUERY = `
    query ($topLimit: Int, $genreLimit: Int){
        top: Page(perPage: $topLimit){
            media(type: ANIME, sort: SCORE_DESC){
                id
                title { romaji }
                coverImage { large }
                startDate { year }
                status
            }
        }
        action: Page(perPage: $genreLimit){
            media(type: ANIME, genre_in: ["Action"], sort: SCORE_DESC){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
                status
            }
        }
        adventure: Page(perPage: $genreLimit){
            media(type: ANIME, genre_in: ["Adventure"], sort: SCORE_DESC){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
                status
            }
        }
        isekai: Page(perPage: $genreLimit){
            media(type: ANIME, tag_in: ["Isekai"], sort: SCORE_DESC){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
                status
            }
        }
    }`;

export const SEARCH_QUERY = `
    query ($search: String) {
        Page(perPage: 20) {
            media(search: $search, type: ANIME) {
                id
                title { romaji }
                coverImage { large }
                startDate { year }
                episodes
                genres
                averageScore
            }
        }
    }`;

export const PREVIEW_QUERY = `
    query($search: String) {
    Page(perPage: 6) {
        media(type: ANIME, search: $search) {
            id
            title {romaji}
            coverImage {medium}
            startDate {year}
        }
    }
}`

export const DETAIL_QUERY = `
    query($id: Int) {
        Media(id: $id, type: ANIME) {
            id
            title {romaji}
            coverImage {extraLarge}
            description
            startDate {year}
            status
            episodes
            genres
            averageScore
            trailer {
                id
                site
                thumbnail
            }
        }
    }`;
