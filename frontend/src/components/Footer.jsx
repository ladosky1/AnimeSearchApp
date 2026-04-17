import { GithubLogo, TwitterLogo, InstagramLogo } from "phosphor-react";

function Footer() {
  return (
    <footer className="mt-2 border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col text-center
                      items-center gap-3 text-sm text-textMuted">
      <p>
        <span className="text-cyan font-medium">© 2026</span> LadoSky Anime Finder
      </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/ladosky1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-pink transition"
          >
            <GithubLogo size={20} weight="bold"/>
          </a>

          <a
            href="https://x.com/ladosky__"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-pink transition"
          >
            <TwitterLogo size={20} weight="bold"/>
          </a>

          <a
            href="https://www.instagram.com/laadoosky___"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-pink transition"
          >
            <InstagramLogo size={20} weight="bold"/>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;