import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiExternalLink, FiCheck } from "react-icons/fi";

import type { WatchlistAnime } from "../types/watchlist";

interface WatchlistCardProps {
    anime: WatchlistAnime;
    onRemove: (animeId: number) => void;
    onUpdateNote: (animeId: number, note: string) => void;
}

function WatchlistCard({
    anime,
    onRemove,
    onUpdateNote,
}: WatchlistCardProps) {
    const navigate = useNavigate();

    const [note, setNote] = useState(anime.note);
    const [isSaved, setIsSaved] = useState(true);

    useEffect(() => {
        setNote(anime.note);
    }, [anime.note]);

    useEffect(() => {
        if (note === anime.note) {
            setIsSaved(true);
            return;
        }

        setIsSaved(false);

        const timeout = window.setTimeout(() => {
            onUpdateNote(anime.id, note);
            setIsSaved(true);
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [note, anime.id, anime.note, onUpdateNote]);

    return (
        <article
            className="
                group flex min-w-0 flex-col overflow-hidden
                rounded-xl border border-white/10
                bg-(--color-surface)
                transition duration-200
                hover:-translate-y-1
                hover:border-(--color-primary)/30
                hover:shadow-lg hover:shadow-black/20
            "
        >
            {/* Anime information */}
            <div className="flex min-w-0 gap-3 p-3 sm:gap-4 sm:p-4">
                <button
                    type="button"
                    onClick={() => navigate(`/detail/${anime.id}`)}
                    aria-label={`View details for ${anime.title}`}
                    className="
                        w-24 shrink-0 self-start overflow-hidden
                        rounded-lg bg-(--color-surface-elevated)
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-(--color-primary)
                        sm:w-28
                    "
                >
                    {anime.image ? (
                        <img
                            src={anime.image}
                            alt={anime.title}
                            loading="lazy"
                            className="
                                aspect-3/4 h-auto w-full object-cover
                                transition-transform duration-300
                                group-hover:scale-[1.02]
                            "
                        />
                    ) : (
                        <div className="flex aspect-3/4 items-center justify-center p-2 text-center text-xs text-(--color-text-subtle)">
                            No image available
                        </div>
                    )}
                </button>

                <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-(--color-text) sm:text-base">
                        {anime.title}
                    </h3>

                    <p className="mt-2 text-xs text-(--color-text-muted)">
                        {anime.status === "RELEASING"
                            ? "Currently Airing"
                            : anime.year ?? "Unknown year"}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/detail/${anime.id}`)
                            }
                            className="
                                inline-flex items-center justify-center
                                gap-1.5 rounded-lg
                                bg-(--color-primary) px-3 py-2
                                text-xs font-medium text-(--color-bg)
                                transition-opacity hover:opacity-90
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-(--color-primary)
                            "
                        >
                            <FiExternalLink size={13} />
                            Details
                        </button>

                        <button
                            type="button"
                            onClick={() => onRemove(anime.id)}
                            aria-label={`Remove ${anime.title} from watchlist`}
                            className="
                                inline-flex items-center justify-center
                                gap-1.5 rounded-lg border
                                border-(--color-pink)/30
                                px-3 py-2 text-xs
                                font-medium text-(--color-pink)
                                transition-colors
                                hover:bg-(--color-pink)/10
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-(--color-pink)
                            "
                        >
                            <FiTrash2 size={13} />
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal notes */}
            <div className="border-t border-white/10 bg-white/1.5 p-3 sm:p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                    <label
                        htmlFor={`note-${anime.id}`}
                        className="text-sm font-medium text-(--color-text)"
                    >
                        My Notes
                    </label>

                    <span
                        aria-live="polite"
                        className="flex shrink-0 items-center gap-1 text-[0.7rem] text-(--color-text-subtle)"
                    >
                        {isSaved ? (
                            <>
                                <FiCheck
                                    size={12}
                                    className="text-(--color-success)"
                                />
                                Saved
                            </>
                        ) : (
                            "Saving..."
                        )}
                    </span>
                </div>

                <textarea
                    id={`note-${anime.id}`}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Add a note... e.g. stopped at episode 15"
                    rows={3}
                    maxLength={2000}
                    className="
                        w-full resize-y rounded-lg
                        border border-white/10
                        bg-(--color-bg)
                        px-3 py-2.5
                        text-sm leading-relaxed
                        text-(--color-text)
                        placeholder:text-(--color-text-subtle)
                        outline-none transition-colors
                        focus:border-(--color-primary)/50
                        focus:ring-1 focus:ring-(--color-primary)/20
                    "
                />

                <p className="mt-1 text-right text-[0.65rem] text-(--color-text-subtle)">
                    {note.length}/2000
                </p>
            </div>
        </article>
    );
}

export default WatchlistCard;