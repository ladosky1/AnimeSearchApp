import { useNavigate } from "react-router-dom";

import type { Relation } from "../../types/anime";

const relationLabels = {
    PREQUEL: "Prequel",
    SEQUEL: "Sequel",
    SIDE_STORY: "Side Story",
    ALTERNATIVE: "Alternative",
} as const;

type RelationType = keyof typeof relationLabels;

interface DetailRelationsProps {
    relations?: Relation[];
}

function DetailRelations({
    relations = [],
}: DetailRelationsProps) {
    const navigate = useNavigate();

    if (relations.length === 0) return null;

    return (
        <section className="min-w-0 space-y-4">
            <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Related Anime
                </h2>

                <p className="mt-1 text-sm text-(--color-text-muted)">
                    Anime connected to this series
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {relations.map((anime) => (
                    <button
                        key={`${anime.relationType}-${anime.id}`}
                        type="button"
                        onClick={() =>
                            navigate(`/detail/${anime.id}`)
                        }
                        aria-label={`View ${anime.title}, ${relationLabels[
                            anime.relationType as RelationType
                        ] ?? anime.relationType}`}
                        className="
                            group min-w-0 overflow-hidden rounded-xl
                            border border-white/10 bg-white/2.5
                            text-left transition duration-200
                            hover:-translate-y-1 hover:border-(--color-primary)/40
                            hover:shadow-lg hover:shadow-black/20
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-(--color-primary)">
                        <div className="relative aspect-3/4 overflow-hidden bg-(--color-surface)">
                            {anime.image ? (
                                <img
                                    src={anime.image}
                                    alt={anime.title}
                                    loading="lazy"
                                    className="
                                        h-full w-full object-cover
                                        transition-transform duration-300
                                        group-hover:scale-105
                                    "
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center px-3 text-center text-sm text-(--color-text-subtle)">
                                    No image available
                                </div>
                            )}

                            <div
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/70 to-transparent"
                            />
                        </div>

                        <div className="min-w-0 p-3">
                            <span className="text-[0.65rem] font-medium uppercase tracking-wider text-(--color-primary)">
                                {relationLabels[
                                    anime.relationType as RelationType
                                ] ?? anime.relationType}
                            </span>

                            <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-(--color-text) transition-colors group-hover:text-(--color-primary)">
                                {anime.title}
                            </h3>

                            <p className="mt-2 text-xs text-(--color-text-muted)">
                                {anime.year ?? "Unknown year"}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default DetailRelations;