import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

interface NavMenuProps {
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
}

function NavMenu({ open, onToggle, onClose }: NavMenuProps) {
    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                className="
                    text-cyan p-1
                    hover:scale-110
                    transition"
                aria-label="Open menu">
                <FiMenu size={22} />
            </button>

            {open && (
                <div
                    className="
                        absolute top-12 right-0
                        md:w-32
                        bg-bgLight
                        rounded-base
                        border border-white/10
                        shadow-xl
                        overflow-hidden
                        z-50
                        flex flex-col">
                    <Link
                        to="/"
                        onClick={onClose}
                        className="
                            px-4 py-3 text-sm
                            hover:bg-white/5
                            transition">
                        Home
                    </Link>

                    <Link
                        to="/watchlist"
                        onClick={onClose}
                        className="
                            px-4 py-3 text-sm
                            hover:bg-white/5
                            transition">
                        Watchlist
                    </Link>
                </div>
            )}
        </div>
    );
}

export default NavMenu;