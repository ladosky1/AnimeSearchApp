import type { Character } from "../../types/anime";

interface DetailCharactersProps {
    characters?: Character[];
}

function DetailCharacters({
    characters = [],
}: DetailCharactersProps) {
    if (characters.length === 0) return null;

    return (
        <section className="space-y-5">
            {/* Section heading */}
            <div className="space-y-1">
                <h2 className="
                    text-xl font-semibold tracking-tight
                    text-(--color-text)
                    sm:text-2xl
                ">
                    Characters
                </h2>

                <p className="text-sm text-(--color-text-muted)">
                    Main characters and their voice actors
                </p>
            </div>

            {/* Character grid */}
            <div className="
                grid grid-cols-2 gap-3
                sm:grid-cols-3 sm:gap-4
                lg:grid-cols-4
                xl:grid-cols-5
            ">
                {characters.slice(0, 10).map((character) => {
                    const voiceActor = character.voiceActors[0];

                    return (
                        <article
                            key={character.id}
                            className="
                                group min-w-0 overflow-hidden
                                rounded-xl border border-white/10
                                bg-white/2.5
                                transition-all duration-200
                                hover:-translate-y-1
                                hover:border-(--color-primary)/30
                                hover:shadow-lg
                                hover:shadow-black/20
                                motion-reduce:transform-none
                                motion-reduce:transition-none
                            "
                        >
                            {/* Character portrait */}
                            <div className="
                                relative aspect-4/5
                                overflow-hidden bg-white/5
                            ">
                                {character.image ? (
                                    <img
                                        src={character.image}
                                        alt={character.name}
                                        loading="lazy"
                                        className="
                                            h-full w-full
                                            object-cover
                                            transition-transform
                                            duration-300
                                            group-hover:scale-[1.03]
                                            motion-reduce:transform-none
                                        "
                                    />
                                ) : (
                                    <div className="
                                        flex h-full w-full
                                        items-center justify-center
                                        px-3 text-center
                                        text-xs
                                        text-(--color-text-muted)
                                    ">
                                        Image unavailable
                                    </div>
                                )}

                                {/* Character role badge */}
                                {character.role && (
                                    <span className="
                                        absolute bottom-2 left-2
                                        max-w-[calc(100%-1rem)]
                                        truncate rounded-md
                                        border border-white/10
                                        bg-black/70
                                        px-2 py-1
                                        text-[10px] font-medium
                                        capitalize text-white
                                        backdrop-blur-sm
                                    ">
                                        {character.role.toLowerCase()}
                                    </span>
                                )}
                            </div>

                            {/* Character details */}
                            <div className="space-y-3 p-3">
                                <h3 className="
                                    line-clamp-2
                                    min-h-10
                                    text-sm font-semibold
                                    leading-5
                                    text-(--color-text)
                                ">
                                    {character.name}
                                </h3>

                                {/* Voice actor */}
                                {voiceActor && (
                                    <div className="
                                        border-t border-white/10
                                        pt-3
                                    ">
                                        <p className="
                                            mb-2 text-[10px]
                                            font-semibold uppercase
                                            tracking-wider
                                            text-(--color-text-subtle)
                                        ">
                                            Japanese voice actor
                                        </p>

                                        <div className="
                                            flex min-w-0
                                            items-center gap-2
                                        ">
                                            {voiceActor.image ? (
                                                <img
                                                    src={voiceActor.image}
                                                    alt=""
                                                    loading="lazy"
                                                    className="
                                                        h-8 w-8 shrink-0
                                                        rounded-full
                                                        border border-white/10
                                                        object-cover
                                                    "
                                                />
                                            ) : (
                                                <div className="
                                                    grid h-8 w-8 shrink-0
                                                    place-items-center
                                                    rounded-full
                                                    bg-white/5
                                                    text-xs
                                                    text-(--color-text-muted)
                                                ">
                                                    ?
                                                </div>
                                            )}

                                            <span className="
                                                line-clamp-2 min-w-0
                                                text-xs leading-4
                                                text-(--color-text-muted)
                                            ">
                                                {voiceActor.name}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default DetailCharacters;
