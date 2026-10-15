import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

import type { Anime } from "../../types/anime";
import AnimeCard from "./AnimeCard";

interface AnimeSectionProps {
    title: string;
    animeList?: Anime[];
    loading: boolean;
    error: boolean;
}

function AnimeSection({
    title,
    animeList = [],
    loading,
    error,
}: AnimeSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] =
        useState(false);

    const [canScrollRight, setCanScrollRight] =
        useState(false);

    const updateScrollState = useCallback(() => {
        const container = scrollRef.current;

        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } =
            container;

        setCanScrollLeft(scrollLeft > 2);

        setCanScrollRight(
            scrollLeft + clientWidth < scrollWidth - 2
        );
    }, []);

    useEffect(() => {
        const container = scrollRef.current;

        if (!container) return;

        updateScrollState();

        container.addEventListener(
            "scroll",
            updateScrollState,
            { passive: true }
        );

        const resizeObserver = new ResizeObserver(
            updateScrollState
        );

        resizeObserver.observe(container);

        return () => {
            container.removeEventListener(
                "scroll",
                updateScrollState
            );

            resizeObserver.disconnect();
        };
    }, [
        updateScrollState,
        loading,
        error,
        animeList.length,
    ]);

    const scrollCarousel = (direction: -1 | 1) => {
        const container = scrollRef.current;

        if (!container) return;

        const distance = container.clientWidth * 0.8;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        container.scrollBy({
            left: distance * direction,
            behavior: reducedMotion ? "instant" : "smooth",
        });
    };

    return (
        <section className="min-w-0 space-y-4">
            {/* Section heading */}
           <div className="flex items-end justify-between gap-4 px-1 pb-1">
            <div className="min-w-0 space-y-1">
                <h2 className="
                    text-lg font-semibold tracking-tight
                    text-(--color-text)
                    sm:text-xl md:text-2xl
                ">
                    {title}
                </h2>

                <div className="
                    h-0.5 w-10 rounded-full
                    bg-(--color-primary)
                    opacity-80
                " />
            </div>

            {!loading && !error && (
                <span className="
                    shrink-0 pb-0.5
                    text-xs font-medium
                    text-(--color-text-muted)
                    sm:text-sm
                ">
                    {animeList.length} anime
                </span>
            )}
        </div>

            {/* Carousel */}
            <div className="group/carousel relative">
                {/* Left arrow */}
                <button
                    type="button"
                    aria-label={`Scroll ${title} left`}
                    onClick={() => scrollCarousel(-1)}
                    disabled={!canScrollLeft}
                    className="
                        absolute left-2 top-1/2 z-20
                        hidden h-10 w-10 -translate-y-1/2
                        items-center justify-center
                        rounded-full border border-white/10
                        bg-black/75 text-white
                        shadow-lg backdrop-blur-md
                        transition-all duration-200
                        hover:border-(--color-primary)
                        hover:bg-(--color-surface-elevated)
                        hover:text-(--color-primary)
                        disabled:pointer-events-none
                        disabled:opacity-0
                        md:flex
                        motion-reduce:transition-none
                    "
                >
                    <FiChevronLeft size={23} />
                </button>

                {/* Right arrow */}
                <button
                    type="button"
                    aria-label={`Scroll ${title} right`}
                    onClick={() => scrollCarousel(1)}
                    disabled={!canScrollRight || loading || error}
                    className="
                        absolute right-2 top-1/2 z-20
                        hidden h-10 w-10 -translate-y-1/2
                        items-center justify-center
                        rounded-full border border-white/10
                        bg-black/75 text-white
                        shadow-lg backdrop-blur-md
                        transition-all duration-200
                        hover:border-(--color-primary)
                        hover:bg-(--color-surface-elevated)
                        hover:text-(--color-primary)
                        disabled:pointer-events-none
                        disabled:opacity-0
                        md:flex
                        motion-reduce:transition-none
                    "
                >
                    <FiChevronRight size={23} />
                </button>

                {/* Left edge fade */}
                <div className="
                    pointer-events-none absolute
                    inset-y-0 left-0 z-10 w-5
                    bg-linear-to-r
                    from-(--color-bg) to-transparent
                    md:w-8
                " />

                {/* Right edge fade */}
                <div className="
                    pointer-events-none absolute
                    inset-y-0 right-0 z-10 w-5
                    bg-linear-to-l
                    from-(--color-bg) to-transparent
                    md:w-8
                " />

                <div
                    ref={scrollRef}
                    className="
                        flex gap-3 overflow-x-auto
                        overscroll-x-contain
                        scroll-smooth
                        pb-2
                        scrollbar-none
                        [&::-webkit-scrollbar]:hidden
                        sm:gap-4
                    "
                >
                    {loading ? (
                        Array.from({ length: 7 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="
                                        w-32 shrink-0
                                        animate-pulse
                                        sm:w-36 md:w-40 lg:w-44
                                        motion-reduce:animate-none
                                    "
                                >
                                    <div className="
                                        aspect-2/3 rounded-xl
                                        border border-white/5
                                        bg-white/5
                                    " />

                                    <div className="
                                        mt-3 h-3 w-3/4
                                        rounded bg-white/5
                                    " />

                                    <div className="
                                        mt-2 h-3 w-1/2
                                        rounded bg-white/5
                                    " />
                                </div>
                            )
                        )
                    ) : error ? (
                        <p className="py-4 text-sm text-(--color-pink)">
                            Failed to load anime. Please try again.
                        </p>
                    ) : animeList.length === 0 ? (
                        <p className="
                            py-4 text-sm
                            text-(--color-text-muted)
                        ">
                            No anime available right now.
                        </p>
                    ) : (
                        animeList.map((anime, index) => (
                            <div
                                key={anime.id}
                                className="
                                    shrink-0
                                    animate-[anime-card-enter_450ms_ease-out_both]
                                    motion-reduce:animate-none
                                "
                                style={{
                                    animationDelay: `${Math.min(
                                        index * 45,
                                        270
                                    )}ms`,
                                }}
                            >
                                <AnimeCard anime={anime} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default AnimeSection;