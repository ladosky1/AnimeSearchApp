import AppError from "../errors/AppError.js";

interface AniListError {
    message: string;
    status?: number;
}

interface AniListResponse<T> {
    data: T | null;
    errors?: AniListError[];
}

export async function fetchAnilist<T>(
    query: string,
    variables: Record<string, unknown> = {}
): Promise<T> {
    const ANILIST_URL = process.env.ANILIST_URL;

    if (!ANILIST_URL) {
        throw new AppError("AniList API URL is not configured", 500);
    }

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

    if (!response.ok) {
        const errorBody = await response.text();

        console.error("AniList error:", errorBody);

        throw new AppError(
            `AniList request failed with status ${response.status}`,
            502
        );
    }

    const result = await response.json() as AniListResponse<T>;

    if (result.errors?.length) {
        const message = result.errors
            .map(error => error.message)
            .join(", ");

        throw new AppError(message, 502);
    }

    if (!result.data) {
        throw new AppError("AniList returned no data", 502);
    }

    return result.data;
}