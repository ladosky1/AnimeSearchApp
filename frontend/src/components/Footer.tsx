import { FiGithub, FiInstagram, FiExternalLink } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="relative z-0 border-t border-white/10 bg-(--color-bg)/70 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-5 px-4 py-8 text-center sm:px-6 md:px-8 lg:px-10">
                {/* Branding */}
                <div className="space-y-2">
                    <p className="font-(family-name:--font-logo) text-lg tracking-wide">
                        <span className="text-(--color-primary)">
                            Anime
                        </span>
                        <span className="text-white">Lad</span>
                    </p>

                    <p className="text-sm text-(--color-text-muted)">
                        Discover anime. Find your next obsession.
                    </p>
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center gap-5">
                    <a
                        href="https://github.com/ladosky1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-text-muted) transition-colors hover:text-(--color-primary)"
                        aria-label="GitHub"
                        title="GitHub"
                    >
                        <FiGithub size={19} />
                    </a>

                    <a
                        href="https://x.com/ladosky__"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-text-muted) transition-colors hover:text-(--color-primary)"
                        aria-label="X"
                        title="X"
                    >
                        <FaXTwitter size={19} />
                    </a>

                    <a
                        href="https://www.instagram.com/laadoosky___"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-text-muted) transition-colors hover:text-(--color-primary)"
                        aria-label="Instagram"
                        title="Instagram"
                    >
                        <FiInstagram size={19} />
                    </a>

                    <a
                        href="https://ladosky.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-text-muted) transition-colors hover:text-(--color-primary)"
                        aria-label="LadoSky portfolio"
                        title="My Portfolio"
                    >
                        <FiExternalLink size={19} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="w-full border-t border-white/5 pt-4">
                    <p className="text-xs text-(--color-text-subtle)">
                        © {new Date().getFullYear()} AnimeLad.
                        {" "}Built by{" "}
                        <a
                            href="https://ladosky.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-(--color-primary) transition-colors hover:text-white"
                        >
                            LadoSky
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;