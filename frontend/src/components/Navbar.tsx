
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./navbar/SearchBar";

function Navbar() {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors duration-200 ${
            isActive
                ? "text-(--color-primary)"
                : "text-(--color-text-muted) hover:text-white"
        }`;

    return (
        <nav className="
            sticky top-0 z-50 w-full
            border-b border-white/10
            bg-transparent
            backdrop-saturate-150 backdrop-blur-sm
            transition-colors duration-200
            md:border-b-2">
            <div className="
                mx-auto grid w-full max-w-screen-2xl
                grid-cols-[1fr_auto] items-center
                gap-x-3 gap-y-0
                px-4 py-3 sm:px-6 lg:px-10
                md:flex md:min-h-16 md:gap-6">
                <Link
                    to="/"
                    aria-label="AnimeLad home"
                    className="
                        shrink-0 font-(family-name:--font-logo)
                        text-xl tracking-wide text-(--color-primary)
                        sm:text-2xl
                    "
                >
                    <span className="text-(--color-primary)">Anime</span>
                    <span className="text-white">Lad</span>
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    <NavLink to="/" end className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/watchlist" className={navLinkClass}>
                        Watchlist
                    </NavLink>
                </div>

                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
