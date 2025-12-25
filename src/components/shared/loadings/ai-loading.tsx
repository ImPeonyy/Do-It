const AiLoading = ({ content = "Loading..." }: { content?: string }) => {
    return (
        <div className="relative flex h-45 w-45 items-center justify-center rounded-full bg-transparent font-['Inter',sans-serif] text-[1.2em] font-light text-white select-none">
            {content.split("").map((letter, index) => (
                <span
                    key={index}
                    className={`animate-loader-letter z-1 inline-block translate-y-0 rounded-[50ch] border-none opacity-40 ${
                        letter === " " ? "w-[0.3em]" : ""
                    }`}
                    style={{
                        animationDelay: `${index * 0.1}s`,
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
            <div className="animate-loader-rotate absolute top-0 left-0 z-0 aspect-square w-full rounded-full bg-transparent" />
        </div>
    );
};

export default AiLoading;
