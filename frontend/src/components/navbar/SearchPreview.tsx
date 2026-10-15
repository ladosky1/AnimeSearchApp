
import type { Anime } from "../../types/anime";

interface SearchPreviewProps {
    loading: boolean;
    results: Anime[];
    activeIndex: number;
    query: string;
    onHover: (index: number) => void;
    onSelect: (title: string) => void;
}

function SearchPreview({
    loading,
    results,
    activeIndex,
    query,
    onHover,
    onSelect,
}: SearchPreviewProps) {
    const hasQuery = Boolean(query.trim());

    return (
        <div
            className="
                absolute left-1/2 top-full z-60 mt-2
                w-[min(92vw,420px)] -translate-x-1/2
                overflow-hidden rounded-xl
                border border-white/10
                bg-[#0a0f17]/95
                shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
                md:left-auto md:right-0 md:w-full
                md:translate-x-0
            "
            role="listbox"
            aria-label="Anime search suggestions">
            <div className="
                    max-h-[min(65vh,420px)] overflow-y-auto p-2
                    scrollbar-none
                    [&::-webkit-scrollbar]:hidden">
                {loading ? (
                    <div className="space-y-1">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex animate-pulse items-center gap-3 rounded-lg p-2">
                                <div className="h-14 w-11 shrink-0 rounded-md bg-white/10" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-3/4 rounded bg-white/10" />
                                    <div className="h-3 w-1/2 rounded bg-white/10" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : results.length > 0 ? (
                    <div className="space-y-1">
                        {results.map((anime, index) => (
                            <button
                                key={anime.id}
                                type="button"
                                role="option"
                                aria-selected={index === activeIndex}
                                onMouseEnter={() => onHover(index)}
                                onClick={() => onSelect(anime.title)}
                                className={`
                                    flex w-full items-center gap-3
                                    rounded-lg border border-transparent
                                    p-2 text-left transition-colors
                                    ${
                                        index === activeIndex
                                            ? "border-(--color-primary)/30 bg-cyan-400/10"
                                            : "hover:bg-white/5"
                                    }`}>
                                <img
                                    src={anime.image ?? ""}
                                    alt=""
                                    className="
                                        h-14 w-11 shrink-0
                                        rounded-md bg-white/5
                                        object-cover"/>

                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-medium text-(--color-text)">
                                        {anime.title}
                                    </span>
                                    <span className="mt-1 block text-xs text-(--color-text-muted)">
                                        {anime.year ?? "Year unknown"}
                                    </span>
                                </span>

                                <span className="shrink-0 text-lg text-(--color-text-subtle)">
                                    ›
                                </span>
                            </button>
                        ))}
                    </div>
                ) : hasQuery ? (
                    <p className="px-3 py-5 text-center text-sm text-(--color-text-muted)">
                        No anime found for "{query}".
                    </p>
                ) : (
                    <p className="px-3 py-5 text-center text-sm text-(--color-text-muted)">
                        Search for an anime by title.
                    </p>
                )}
            </div>

            {hasQuery && !loading && (
                <button
                    type="button"
                    onClick={() => onSelect(query)}
                    className="
                        flex w-full items-center justify-between
                        border-t border-white/10
                        px-4 py-3 text-sm
                        text-(--color-primary)
                        transition-colors hover:bg-white/5">
                    <span>View all results</span>
                    <span aria-hidden="true">→</span>
                </button>
            )}
        </div>
    );
}

export default SearchPreview;
