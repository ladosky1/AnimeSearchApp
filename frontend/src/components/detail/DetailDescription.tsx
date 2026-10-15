import { useState } from "react";
import DOMPurify from "dompurify";

interface DetailDescriptionProps {
    description: string | null;
}

function DetailDescription({
    description,
}: DetailDescriptionProps) {
    const [expanded, setExpanded] = useState(false);

    if (!description) {
        return (
            <section className="space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">
                    Description
                </h2>

                <p className="text-sm text-(--color-text-muted)">
                    No description available.
                </p>
            </section>
        );
    }

    const sanitizedDescription = DOMPurify.sanitize(description);

    return (
        <section className="min-w-0 space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
                Description
            </h2>

            <div className="relative">
                <div
                    className={`
                        text-sm leading-7
                        text-(--color-text-muted)
                        [&_br]:hidden
                        [&_p]:mb-3
                        ${
                            expanded
                                ? ""
                                : "max-h-40 overflow-hidden md:max-h-none"
                        }
                    `}
                    dangerouslySetInnerHTML={{
                        __html: sanitizedDescription,
                    }}
                />

                {!expanded && (
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none absolute
                            inset-x-0 bottom-0 h-10
                            bg-linear-to-t
                            from-(--color-bg)
                            to-transparent
                            md:hidden
                        "
                    />
                )}
            </div>

            <button
                type="button"
                onClick={() => setExpanded((current) => !current)}
                className="
                    text-sm font-semibold
                    text-(--color-primary)
                    transition-colors
                    hover:text-(--color-primary-hover)
                    md:hidden
                "
                aria-expanded={expanded}
            >
                {expanded ? "See less ↑" : "See more ↓"}
            </button>
        </section>
    );
}

export default DetailDescription;