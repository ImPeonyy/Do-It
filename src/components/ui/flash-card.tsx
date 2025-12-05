import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/index";

const flashCardVariants = cva(`inline-block w-80 h-48 text-(--primary) m-5 cursor-pointer`, {
    variants: {
        variant: {
            default: "bg-transparent",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export enum EFlashCardEffect {
    NONE = "none",
    CORRECT = "correct",
    INCORRECT = "incorrect",
}

export interface FlashCardProps extends VariantProps<typeof flashCardVariants> {
    className?: string;
    effect?: EFlashCardEffect;
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
    width?: string;
    height?: string;
    flipOnHover?: boolean;
    initialFlipped?: boolean;
    flipSignal?: number;
    onFlip?: (flipped: boolean) => void;
    disabled?: boolean;
}

const FlashCard = ({
    className,
    effect,
    frontContent,
    backContent,
    width = "w-80",
    height = "h-48",
    flipOnHover = false,
    initialFlipped = false,
    flipSignal,
    onFlip,
    variant = "default",
    disabled = false,
}: FlashCardProps) => {
    const [flipped, setFlipped] = React.useState<boolean>(initialFlipped);
    const lastFlipSignalRef = React.useRef<number | undefined>(flipSignal);

    function toggleFlip() {
        if (disabled) return;
        setFlipped((s: boolean) => {
            const next = !s;
            onFlip?.(next);
            return next;
        });
    }

    React.useEffect(() => {
        if (flipSignal === undefined) return;
        if (flipSignal === lastFlipSignalRef.current) return;
        lastFlipSignalRef.current = flipSignal;
        setFlipped((s: boolean) => {
            const next = !s;
            onFlip?.(next);
            return next;
        });
    }, [flipSignal, onFlip, disabled]);

    function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
        }
    }

    const outerStyle = { perspective: 1000 } as React.CSSProperties;
    const innerStyle: React.CSSProperties = {
        transformStyle: "preserve-3d",
        transition: "transform 1000ms",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    };

    const faceCommon: React.CSSProperties = {
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        position: "absolute",
        inset: 0,
    };

    const correctEffect: React.CSSProperties = {
        border: "4px solid var(--success)",
        boxShadow: "0 0 10px 0 rgba(0, 255, 0, 0.5)",
        animation: "pop 0.4s ease-out",
    };

    const incorrectEffect: React.CSSProperties = {
        border: "4px solid var(--error)",
        boxShadow: "0 0 10px 0 rgba(255, 0, 0, 0.5)",
        animation: "shake 0.4s ease-in-out 2",
    };

    const getEffectStyle = () => {
        switch (effect) {
            case EFlashCardEffect.CORRECT:
                return correctEffect;
            case EFlashCardEffect.INCORRECT:
                return incorrectEffect;
        }
        return {};
    };

    return (
        <div
            className={cn(flashCardVariants({ variant }), className, width, height)}
            style={outerStyle}
            onMouseEnter={flipOnHover ? () => setFlipped(true) : undefined}
            onMouseLeave={flipOnHover ? () => setFlipped(false) : undefined}
        >
            <div
                className={"relative h-full w-full rounded-2xl"}
                role="button"
                tabIndex={0}
                onClick={toggleFlip}
                onKeyDown={handleKey}
                aria-pressed={flipped}
                aria-label={flipped ? "Front" : "Back"}
                style={{ ...innerStyle, ...getEffectStyle() }}
            >
                <div style={faceCommon} className="flex items-center justify-center rounded-xl bg-white shadow-md">
                    <div className="flex h-full w-full items-center justify-center text-center">{frontContent}</div>
                </div>
                <div
                    style={{ ...faceCommon, transform: "rotateY(180deg)" }}
                    className="flex items-center justify-center rounded-xl bg-gray-50 p-4 shadow-md"
                >
                    <div className="flex h-full w-full items-center justify-center text-center">{backContent}</div>
                </div>
            </div>
        </div>
    );
};

FlashCard.displayName = "FlashCard";
export default FlashCard;
