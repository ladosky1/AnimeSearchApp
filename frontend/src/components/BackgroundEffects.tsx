
function BackgroundEffects() {
    return (
        <div
            aria-hidden="true"
            className="background-effects">
            {/* Ambient colour */}
            <div className="ambient-glow ambient-glow-cyan" />
            <div className="ambient-glow ambient-glow-violet" />
            <div className="ambient-glow ambient-glow-pink" />

            {/* Star field and shooting stars */}
            <svg
                className="background-stars"
                viewBox="0 0 1440 1000"
                preserveAspectRatio="xMidYMin slice"
                xmlns="http://www.w3.org/2000/svg">
                <g className="star-particles">
                    <circle cx="110" cy="140" r="1.2" />
                    <circle cx="340" cy="280" r="1" />
                    <circle cx="580" cy="110" r="1.4" />
                    <circle cx="820" cy="240" r="1" />
                    <circle cx="1030" cy="150" r="1.2" />
                    <circle cx="1260" cy="320" r="1" />
                    <circle cx="220" cy="540" r="1" />
                    <circle cx="700" cy="470" r="1.3" />
                    <circle cx="1150" cy="620" r="1" />
                    <circle cx="420" cy="760" r="1.1" />
                    <circle cx="1340" cy="830" r="1.3" />
                    <circle cx="900" cy="900" r="1" />
                </g>

                <g className="shooting-star shooting-star-one">
                    <path d="M 0 0 L -100 35" />
                    <circle r="2" />
                </g>

                <g className="shooting-star shooting-star-two">
                    <path d="M 0 0 L -75 26" />
                    <circle r="1.5" />
                </g>

                <g className="shooting-star shooting-star-three">
                    <path d="M 0 0 L -120 42" />
                    <circle r="1.8" />
                </g>

                <g className="shooting-star shooting-star-four">
                    <path d="M 0 0 L -90 32" />
                    <circle r="1.6" />
                </g>

                <g className="shooting-star shooting-star-five">
                    <path d="M 0 0 L -110 38" />
                    <circle r="1.8" />
                </g>
            </svg>
        </div>
    );
}

export default BackgroundEffects;