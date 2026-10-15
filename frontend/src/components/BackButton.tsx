import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps {
    fallback?: string;
    label?: string;
}

function BackButton({
    fallback = "/",
    label = "Go back",
}: BackButtonProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.state?.idx > 0) {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="
                inline-flex items-center gap-2
                rounded-lg border border-white/10
                bg-white/3
                px-3 py-2
                text-sm font-medium
                text-(--color-text-muted)
                transition duration-200
                hover:border-(--color-primary)/30
                hover:bg-(--color-primary)/5
                hover:text-(--color-primary)
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-(--color-primary)">
            <FiArrowLeft size={16} aria-hidden="true" />
            <span>{label}</span>
        </button>
    );
}

export default BackButton;