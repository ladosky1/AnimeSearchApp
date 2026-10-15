import { FiBookmark, FiCompass } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useWatchlist } from "../context/WatchlistContext";
import WatchlistCard from "../components/WatchlistCard";

function Watchlist() {
    const navigate = useNavigate();
    const { watchlist, remove, updateNote } = useWatchlist();

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 md:px-8 lg:px-10">
            <div className="mx-auto w-full max-w-screen-2xl">
                {/* Page heading */}
                <header className="mb-8">
                    <div className="flex items-start gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-(--color-primary)/20 bg-(--color-primary)/10 text-(--color-primary)">
                            <FiBookmark size={21} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
                                Your collection
                            </p>

                            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-(--color-text) sm:text-3xl">
                                My Watchlist
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
                                Keep your anime picks together and leave
                                personal notes for later.
                            </p>
                        </div>
                    </div>

                    {watchlist.length > 0 && (
                        <div className="mt-6 flex items-center justify-between border-b border-white/10 pb-4">
                            <p className="text-sm text-(--color-text-muted)">
                                Your saved anime
                            </p>

                            <span className="rounded-full border border-(--color-primary)/20 bg-(--color-primary)/5 px-3 py-1 text-xs font-medium text-(--color-primary)">
                                {watchlist.length}{" "}
                                {watchlist.length === 1 ? "title" : "titles"}
                            </span>
                        </div>
                    )}
                </header>

                {/* Empty state */}
                {watchlist.length === 0 ? (
                    <section className="flex min-h-[45vh] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-5 py-12 text-center">
                        <div className="flex size-16 items-center justify-center rounded-2xl border border-(--color-primary)/20 bg-(--color-primary)/5 text-(--color-primary)">
                            <FiBookmark size={28} />
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-(--color-text)">
                            Your watchlist is empty
                        </h2>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-(--color-text-muted)">
                            When you find anime you like, save them here.
                            You can add personal notes to remember where
                            you left off or what you want to watch next.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-(--color-primary) px-5 py-3 text-sm font-semibold text-(--color-bg) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
                        >
                            <FiCompass size={17} />
                            Explore Anime
                        </button>
                    </section>
                ) : (
                    /* Saved anime grid */
                    <section
                        aria-label="Saved anime"
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {watchlist.map((anime) => (
                            <WatchlistCard
                                key={anime.id}
                                anime={anime}
                                onRemove={remove}
                                onUpdateNote={updateNote}
                            />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}

export default Watchlist;