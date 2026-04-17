

export async function fetchAnilist(query, variables = {}) {
    const ANILIST_URL = process.env.ANILIST_URL;
    
    const response = await fetch(ANILIST_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    if(!response.ok) {
        throw new Error(`Anilist request failed: ${response.status}`);
    }

    const result = await response.json();

    if(result.errors){
        const message = result.errors.map(e => e.message).join("");
        throw new Error(message);
    }

    return result.data;
}