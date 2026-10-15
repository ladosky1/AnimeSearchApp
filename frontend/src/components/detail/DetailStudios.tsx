import type { Studio } from "../../types/anime";

interface DetailStudiosProps {
    studios?: Studio[];
}

function DetailStudios({
    studios = [],
}: DetailStudiosProps) {
    if (studios.length === 0) return null;

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="
                    text-xl font-semibold tracking-tight
                    text-(--color-text)
                    sm:text-2xl
                ">
                    Studios
                </h2>

                <p className="text-sm text-(--color-text-muted)">
                    The studios behind this anime
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {studios.map((studio) => (
                    <span
                        key={studio.id}
                        className="
                            inline-flex items-center gap-2
                            rounded-lg border
                            border-white/10
                            bg-white/[0.035]
                            px-3 py-2
                            text-sm font-medium
                            text-(--color-text-muted)
                            transition-colors
                            hover:border-(--color-primary)/30
                            hover:text-(--color-text)
                        "
                    >
                        {studio.isAnimationStudio && (
                            <span
                                aria-hidden="true"
                                className="
                                    h-1.5 w-1.5 shrink-0
                                    rounded-full
                                    bg-(--color-primary)
                                "
                            />
                        )}

                        {studio.name}
                    </span>
                ))}
            </div>
        </section>
    );
}

export default DetailStudios;
