
import {
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBookmark, FiSearch } from "react-icons/fi";

import useDebounce from "../../hooks/useDebounce";
import { usePreviewAnimeQuery } from "../../queries/animeQueries";
import SearchPreview from "./SearchPreview";

function SearchBar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const debouncedQuery = useDebounce(query);

    const {
        data: preview = [],
        isLoading: previewLoading,
    } = usePreviewAnimeQuery(debouncedQuery);

    useEffect(() => {
        setActiveIndex(-1);
    }, [preview]);

    useEffect(() => {
        function handleClickOutside(event: PointerEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setSearchOpen(false);
                setInputFocused(false);
                setActiveIndex(-1);
            }
        }

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handleClickOutside
            );
        };
    }, []);

    useEffect(() => {
        if (searchOpen) {
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [searchOpen]);

    const navigateToResults = (searchQuery: string) => {
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;

        navigate(`/results?q=${encodeURIComponent(trimmedQuery)}`);

        setSearchOpen(false);
        setInputFocused(false);
        setActiveIndex(-1);
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Escape") {
            setSearchOpen(false);
            setInputFocused(false);
            setActiveIndex(-1);
            inputRef.current?.blur();
            return;
        }

        if (!searchOpen) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((previous) =>
                previous < preview.length - 1 ? previous + 1 : 0
            );
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((previous) =>
                previous > 0 ? previous - 1 : preview.length - 1
            );
        }

        if (event.key === "Enter") {
            event.preventDefault();
            navigateToResults(
                activeIndex >= 0 && preview[activeIndex]
                    ? preview[activeIndex].title
                    : query
            );
        }
    };

    const showPreview =
        (searchOpen || inputFocused) &&
        Boolean(
            previewLoading ||
            preview.length > 0 ||
            debouncedQuery.trim()
        );

    return (
        <div
            ref={searchRef}
            className="
                contents
                md:relative md:ml-auto md:block
                md:w-80 lg:w-96
            "
        >
            {/* Mobile controls: one row, right-aligned */}
            <div className="
                col-start-2 row-start-1
                flex items-center justify-self-end gap-2
                md:hidden
            ">
                <button
                    type="button"
                    onClick={() => setSearchOpen((open) => !open)}
                    aria-label={searchOpen ? "Close search" : "Open search"}
                    aria-expanded={searchOpen}
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg text-(--color-text-muted)
                        transition-colors hover:bg-white/5
                        hover:text-(--color-primary)
                    "
                >
                    <FiSearch size={21} />
                </button>

                <Link
                    to="/watchlist"
                    aria-label="Open watchlist"
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg text-(--color-text-muted)
                        transition-colors hover:bg-white/5
                        hover:text-(--color-primary)
                    "
                >
                    <FiBookmark size={20} />
                </Link>
            </div>

            {/* Mobile input: a new row only when opened */}
            <div className={`
                relative col-span-2 row-start-2 min-w-0
                ${searchOpen ? "mt-3 block" : "hidden"}
                md:hidden
            `}>
                <SearchInput
                    inputRef={inputRef}
                    query={query}
                    setQuery={setQuery}
                    setActiveIndex={setActiveIndex}
                    onFocus={() => setInputFocused(true)}
                    onKeyDown={handleKeyDown}
                />

                {showPreview && (
                    <SearchPreview
                        loading={previewLoading}
                        results={preview}
                        activeIndex={activeIndex}
                        query={debouncedQuery}
                        onHover={setActiveIndex}
                        onSelect={navigateToResults}
                    />
                )}
            </div>

            {/* Desktop input: always visible */}
            <div className="relative hidden min-w-0 md:block">
                <SearchInput
                    inputRef={inputRef}
                    query={query}
                    setQuery={setQuery}
                    setActiveIndex={setActiveIndex}
                    onFocus={() => {
                        setInputFocused(true);
                        setSearchOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                />

                {showPreview && (
                    <SearchPreview
                        loading={previewLoading}
                        results={preview}
                        activeIndex={activeIndex}
                        query={debouncedQuery}
                        onHover={setActiveIndex}
                        onSelect={navigateToResults}
                    />
                )}
            </div>
        </div>
    );
}

interface SearchInputProps {
    inputRef: React.RefObject<HTMLInputElement | null>;
    query: string;
    setQuery: (value: string) => void;
    setActiveIndex: (value: number) => void;
    onFocus: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

function SearchInput({
    inputRef,
    query,
    setQuery,
    setActiveIndex,
    onFocus,
    onKeyDown,
}: SearchInputProps) {
    return (
        <div className="
            flex h-10 w-full min-w-0 items-center gap-3
            rounded-md border border-(--color-border)
            bg-(--color-surface) px-3
            transition-colors
            focus-within:border-(--color-primary)
            focus-within:shadow-(--glow-primary)
        ">
            <FiSearch
                size={18}
                className="shrink-0 text-(--color-text-subtle)"
            />

            <input
                ref={inputRef}
                type="text"
                placeholder="Search anime..."
                value={query}
                autoComplete="off"
                onFocus={onFocus}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(-1);
                }}
                onKeyDown={onKeyDown}
                className="
                    h-full min-w-0 flex-1 bg-transparent
                    text-sm text-(--color-text)
                    outline-none
                    placeholder:text-(--color-text-subtle)
                "
            />

            {query && (
                <button
                    type="button"
                    onClick={() => {
                        setQuery("");
                        setActiveIndex(-1);
                        inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="
                        shrink-0 text-lg leading-none
                        text-(--color-text-subtle)
                        hover:text-(--color-text)
                    "
                >
                    ×
                </button>
            )}
        </div>
    );
}

export default SearchBar;
