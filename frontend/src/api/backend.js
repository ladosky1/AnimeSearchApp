const API_BASE = "https://animelad.onrender.com";

export async function getCategories(){
    const response = await fetch(`${API_BASE}/anime/categories`);

    if (!response.ok){
        throw new Error("Failed to fetch categories")
    }

    return response.json();
}

export async function searchAnime(query) {
    const response = await fetch (`${API_BASE}/anime/search?q=${query}`);

    if(!response.ok){
        throw new Error("failed to fetch anime");
    }

    return response.json();
}

export async function previewAnime(query) {
    const response = await fetch (`${API_BASE}/anime/preview?q=${query}`);

    if(!response.ok){
        throw new Error("failed to fetch anime");
    }

    return response.json();
}

export async function detailAnime(id) {
    const response = await fetch (`${API_BASE}/anime/${id}`);

    if(!response.ok){
        throw new Error("failed to fetch anime");
    }

    return response.json();
}

export async function registerUser(formData){
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Registration Failed")
    }

    return data;
}

export async function loginUser(formData){
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
    });
    
    const data = await res.json();
    
    if(!res.ok){
        throw new Error(data.message || "Login Failed")
    }

    return data;
}

export async function logoutUser(){
    const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include"
    })

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Logout Failed")
    }

    return data;
}

export async function getCurrentUser(){
    const res = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
    });

    if(res.status === 401){
        return {user: null};
    }

    return res.json();
}

export async function addToWatchlist(anime){
    const res = await fetch(`${API_BASE}/watchlist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(anime)
    })

    const data = await res.json();

    if(res.status === 401){
        throw new Error("UNAUTHORIZED");
    }

    if(!res.ok){
        throw new Error(data.message || "Failed to Add");
    }

    return data;
}

export async function getWatchlist(){
    const res = await fetch(`${API_BASE}/watchlist`, {
        credentials: "include",
    });

    if(res.status === 401){
        return [];
    }

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Failed to get watchlist")
    }

    return data;
}

export async function deleteWatchlist(animeId){
    const res = await fetch(`${API_BASE}/watchlist/${animeId}`, {
        method: "DELETE",
        credentials: "include",
    })

    const data = await res.json();

    if(res.status === 401){
        throw new Error("UNAUTHORIZED")
    }

    if(!res.ok){
        throw new Error(data.message || "failed to remove anime")
    }

    return data;
}