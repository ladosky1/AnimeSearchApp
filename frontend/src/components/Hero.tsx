import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import moonlitTemple from "../assets/images/Moonlit Waterblade Over the Lantern Temple-1.png";
import neonSkyline from "../assets/images/Neon Skyline Solitude-2.png";
import twilightKingdom from "../assets/images/Lone Swordsman Overlooking the Twilight Kingdom-3.png";

const heroImages = [
    moonlitTemple,
    neonSkyline,
    twilightKingdom,
];

function Hero() {
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveImage((current) =>
                (current + 1) % heroImages.length
            );
        }, 6000);

        return () => window.clearInterval(interval);
    }, []);

    const scrollToDiscover = () => {
        document.getElementById("discover")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <section className="relative isolate w-full">
            {/* Full-width slideshow background */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    inset-x-0 -top-28 bottom-0
                    -z-20 overflow-hidden
                    md:-top-20">
                {heroImages.map((image, index) => (
                    <img
                        key={image}
                        src={image}
                        alt=""
                        className={`
                            absolute inset-0 h-full w-full
                            object-cover
                            transition-[opacity,transform]
                            duration-2000ms ease-in-out
                            ${
                                activeImage === index
                                    ? "scale-105 opacity-100"
                                    : "scale-100 opacity-0"
                            }
                            ${
                                index === 0
                                    ? "object-[85%_center] md:object-center"
                                    : "object-[100%_center] md:object-center"
                            }
                        `}
                    />
                ))}

                {/* Darken the left side behind the text */}
                <div
                    className="
                        absolute inset-0
                        bg-linear-to-r
                        from-(--color-bg)/95
                        via-(--color-bg)/65
                        to-(--color-bg)/25"/>

                {/* Blend the image into the navbar */}
                <div
                    className="
                        absolute inset-x-0 top-0 h-28
                        bg-linear-to-b
                        from-(--color-bg)/55
                        to-transparent
                        md:h-20"/>

                {/* Blend the hero into the discovery sections */}
                <div
                    className="
                        absolute inset-x-0 bottom-0 h-24
                        bg-linear-to-b
                        from-transparent
                        via-(--color-bg)/50
                        to-(--color-bg)
                        sm:h-32 md:h-40"/>
            </div>

            {/* Hero content */}
            <div
                className="
                    mx-auto flex w-full max-w-screen-2xl
                    items-center
                    px-5
                    min-h-70
                    sm:min-h-25 sm:px-8 sm:py-14
                    md:min-h-45 md:px-10
                    lg:min-h-65 lg:px-14">
                <div className="max-w-2xl">
                    <p
                        className="
                            mb-3 text-[10px] font-semibold
                            uppercase tracking-[0.2em]
                            text-(--color-primary)
                            sm:text-sm sm:tracking-[0.25em]
                        ">
                        Discover your next favourite
                    </p>

                    <h1
                        className="
                            max-w-92 text-3xl
                            font-bold leading-[1.12]
                            text-(--color-text)
                            sm:max-w-xl sm:text-5xl
                            lg:text-6xl">
                        Find your next{" "}
                        <span className="text-(--color-primary)">
                            anime obsession.
                        </span>
                    </h1>

                    <p
                        className="
                            mt-4 max-w-88
                            text-sm leading-relaxed
                            text-white/80
                            sm:max-w-lg sm:text-base
                            lg:text-lg">
                        Explore trending series, discover hidden
                        gems, and build your personal watchlist.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                        <button
                            type="button"
                            onClick={scrollToDiscover}
                            className="
                                inline-flex min-h-11
                                items-center justify-center
                                rounded-lg
                                bg-(--color-primary)
                                px-4 py-3
                                text-sm font-semibold
                                text-(--color-bg)
                                transition-colors
                                hover:bg-(--color-primary-hover)
                                sm:px-5">
                            Explore Anime
                        </button>

                        <Link
                            to="/watchlist"
                            className="
                                inline-flex min-h-11
                                items-center justify-center
                                rounded-lg
                                border border-white/20
                                bg-black/25
                                px-4 py-3
                                text-sm font-semibold
                                text-(--color-text)
                                backdrop-blur-sm
                                transition-colors
                                hover:border-(--color-primary)
                                hover:bg-white/10
                                sm:px-5">
                            My Watchlist
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;