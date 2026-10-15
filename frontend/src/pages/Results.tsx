import { useSearchParams } from "react-router-dom";

import { useSearchAnimeQuery } from "../queries/animeQueries";
import AnimeResultCard from "../components/AnimeResultCard";
import BackButton from "../components/BackButton";

function ResultsSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 8 }, (_, index) => (
                <div
                    key={index}
                    className="
                        flex min-w-0 flex-col overflow-hidden
                        rounded-xl border border-white/10
                        bg-(--color-surface)
                        animate-pulse sm:flex-row
                    "
                >
                    <div className="aspect-3/4 w-full bg-white/6 sm:aspect-auto sm:min-h-56 sm:w-32 md:w-36 lg:w-40" />

                    <div className="flex flex-1 flex-col gap-3 p-4">
                        <div className="h-5 w-4/5 rounded bg-white/10" />
                        <div className="h-3 w-1/2 rounded bg-white/6" />

                        <div className="flex gap-2">
                            <div className="h-6 w-16 rounded bg-white/6" />
                            <div className="h-6 w-12 rounded bg-white/6" />
                        </div>

                        <div className="flex gap-2">
                            <div className="h-6 w-14 rounded bg-white/6" />
                            <div className="h-6 w-16 rounded bg-white/6" />
                        </div>

                        <div className="mt-2 h-10 w-full rounded-lg bg-white/6 sm:mt-auto" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function Results() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() ?? "";

    const {
        data,
        isLoading,
        isError,
    } = useSearchAnimeQuery(query);

    const results = data?.anime ?? [];

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 md:px-8 lg:px-10">
            <div className="mb-5">
                <BackButton fallback="/" />
            </div>
            
            <div className="mx-auto w-full max-w-screen-2xl">
                {!query ? (
                    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                        <span className="mb-4 text-4xl" aria-hidden="true">
                            🔎
                        </span>

                        <h1 className="text-xl font-semibold text-(--color-text)">
                            Find your next anime
                        </h1>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-(--color-text-muted)">
                            Use the search bar to discover anime by title.
                        </p>
                    </div>
                ) : (
                    <>
                        <header className="mb-6 sm:mb-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
                                Anime discovery
                            </p>

                            <h1 className="mt-2 wrap-break-word text-2xl font-semibold tracking-tight text-(--color-text) sm:text-3xl">
                                Results for{" "}
                                <span className="text-(--color-primary)">
                                    "{query}"
                                </span>
                            </h1>

                            <p className="mt-2 text-sm text-(--color-text-muted)">
                                Explore anime matching your search.
                            </p>
                        </header>

                        {isLoading ? (
                            <ResultsSkeleton />
                        ) : isError ? (
                            <div
                                role="alert"
                                className="rounded-xl border border-(--color-pink)/20 bg-(--color-pink)/5 px-5 py-8 text-center"
                            >
                                <h2 className="font-medium text-(--color-text)">
                                    Couldn't load search results
                                </h2>

                                <p className="mt-2 text-sm text-(--color-text-muted)">
                                    Something went wrong while searching. Please try again.
                                </p>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="flex min-h-[30vh] flex-col items-center justify-center text-center">
                                <span className="mb-4 text-4xl" aria-hidden="true">
                                    🍃
                                </span>

                                <h2 className="text-lg font-semibold text-(--color-text)">
                                    No anime found
                                </h2>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-(--color-text-muted)">
                                    No results matched "{query}". Try another title or a shorter search term.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="mb-4 text-sm text-(--color-text-muted)">
                                    {results.length}{" "}
                                    {results.length === 1 ? "result" : "results"}
                                </p>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {results.map((anime) => (
                                        <AnimeResultCard
                                            key={anime.id}
                                            anime={anime}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}

export default Results;