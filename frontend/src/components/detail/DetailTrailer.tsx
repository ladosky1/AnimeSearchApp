import type { Trailer } from "../../types/anime";

interface DetailTrailerProps {
    trailer: Trailer | null;
}

function DetailTrailer({ trailer }: DetailTrailerProps) {
    return (
        <section className="min-w-0 space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
                Trailer
            </h2>

            {trailer ? (
                <div
                    className="
                        relative w-full aspect-video
                        overflow-hidden rounded-xl
                        border border-white/10
                        bg-black/40
                        shadow-lg shadow-black/20
                    "
                >
                    <iframe
                        src={trailer.embedUrl}
                        title="Anime trailer"
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            ) : (
                <div
                    className="
                        flex aspect-video w-full
                        flex-col items-center justify-center
                        gap-3 rounded-xl
                        border border-white/10
                        bg-white/3
                        px-4 text-center
                    "
                >
                    <span
                        aria-hidden="true"
                        className="
                            grid h-12 w-12 place-items-center
                            rounded-full border border-white/10
                            bg-white/5 text-xl
                        "
                    >
                        🎬
                    </span>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-(--color-text)">
                            No trailer available
                        </p>

                        <p className="text-xs text-(--color-text-muted)">
                            There isn't a trailer available for this anime yet.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default DetailTrailer;