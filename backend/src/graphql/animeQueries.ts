export const DISCOVER_QUERY = `
    query (
        $trendingPage: Int, 
        $popularPage: Int,
        $airingPage: Int,
        $topRatedPage: Int,
        $perPage: Int
    ){
        trending: Page(
                page: $trendingPage,
                perPage: $perPage
            ) {
            media(type: ANIME, sort: TRENDING_DESC){
                id
                title { romaji }
                coverImage { large }
                startDate { year }
                status
                averageScore
            }
        }
        
        popular: Page(
                page: $popularPage,
                perPage: $perPage
            ){
            media(type: ANIME, sort: POPULARITY_DESC){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
                status
                averageScore
            }
        }

        airing: Page(
                page: $airingPage,
                perPage: $perPage
            ){
            media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
                status
                averageScore
            }
        }

        topRated: Page(
                page: $topRatedPage,
                perPage: $perPage
            ){
            media(type: ANIME, sort: SCORE_DESC){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
                status
                averageScore
            }
        }
    }`;

export const GENRE_QUERY = `
    query ($genre: String, $page: Int, $perPage: Int) {
        Page(
            page: $page, 
            perPage: $perPage
        ){
            pageInfo {
                currentPage,
                hasNextPage,
                lastPage,
            }
            
            media(
                type: ANIME, 
                genre: $genre, 
                sort: POPULARITY_DESC
            ){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
                status
                averageScore
            }
        }
    }
`;

export const SEARCH_QUERY = `
    query ($search: String, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage,
                hasNextPage,
                lastPage,
                total
            }
            
            media(search: $search, type: ANIME){
                id
                title {romaji}
                coverImage {large}
                startDate {year}
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
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
            }
            bannerImage
            description(asHtml: false)
            startDate {
                year
                month
                day
            }
            season
            seasonYear

            status

            episodes
            duration

            averageScore
            meanScore

            genres

            tags {
                id
                name
                rank
                isMediaSpoiler
            }
            
            studios{
                nodes{
                    id
                    name
                    isAnimationStudio
                }
            }
            
            trailer {
                id
                site
                thumbnail
            }
            
            nextAiringEpisode{
                airingAt
                timeUntilAiring
                episode
            }
            
            characters(
                sort: [ROLE, RELEVANCE]
                perPage: 12
            ) {
                edges {
                    role

                    node {
                        id
                        name{full}
                        image{large}
                    }

                    voiceActors(language: JAPANESE){
                        id
                        name{full}
                        image {large}
                    }
                }
            }
            
            relations {
                edges {
                    relationType

                    node {
                        id
                        type

                        title{romaji}
                        coverImage{medium}
                        startDate{year}

                        status
                    }
                }
            }
        }
    }`;
