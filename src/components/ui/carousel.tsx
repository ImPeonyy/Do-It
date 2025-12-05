import * as React from "react";
import { cn } from "@/utils/index";
import { cva, type VariantProps } from "class-variance-authority";

const carouselVariants = cva("relative overflow-hidden", {
    variants: {
        variant: {
            default: "bg-transparent",
        },
        type: {
            default: "",
            flashCard: "",
        },
    },
    defaultVariants: {
        variant: "default",
        type: "default",
    },
});

export interface CarouselProps<T> extends VariantProps<typeof carouselVariants> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    itemClassName?: string;
    autoPlay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    loop?: boolean;
    onIndexChange?: (index: number) => void;
}

const Carousel = <T,>({
    items,
    renderItem,
    className,
    itemClassName,
    autoPlay = false,
    interval = 3000,
    showDots = true,
    showArrows = true,
    loop = true,
    variant = "default",
    type = "default",
    onIndexChange,
}: CarouselProps<T>) => {
    const [index, setIndex] = React.useState(0);
    const length = items.length;

    const goNext = React.useCallback(() => {
        setIndex((prev) => {
            if (prev === length - 1) return loop ? 0 : prev;
            return prev + 1;
        });
    }, [length, loop]);

    const goPrev = React.useCallback(() => {
        setIndex((prev) => {
            if (prev === 0) return loop ? length - 1 : prev;
            return prev - 1;
        });
    }, [length, loop]);

    React.useEffect(() => {
        onIndexChange?.(index);
    }, [index, onIndexChange]);

    React.useEffect(() => {
        if (!autoPlay || length <= 1) return;
        const timer = setInterval(goNext, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, goNext, length]);

    const startX = React.useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX.current - endX;

        if (diff > 50) goNext();
        if (diff < -50) goPrev();
    };

    const getArrowByType = (type: VariantProps<typeof carouselVariants>["type"]) => {
        switch (type) {
            case "default":
                return (
                    <>
                        <button
                            onClick={goPrev}
                            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                        >
                            ◀
                        </button>
                        <button
                            onClick={goNext}
                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                        >
                            ▶
                        </button>
                    </>
                );
            case "flashCard":
                return (
                    <div className="flex items-center justify-center gap-50">
                        <button onClick={goPrev} className="rounded-full bg-black/40 p-2 text-white hover:bg-black/60">
                            ◀
                        </button>
                        <button onClick={goNext} className="rounded-full bg-black/40 p-2 text-white hover:bg-black/60">
                            ▶
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    const getDotByType = (type: VariantProps<typeof carouselVariants>["type"]) => {
        const visibleCount = 5;
        const half = Math.floor(visibleCount / 2);

        const start = Math.max(0, Math.min(index - half, items.length - visibleCount));
        const visibleItems = items.slice(start, start + visibleCount);

        switch (type) {
            case "default":
                return (
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={cn(
                                    "h-2 w-2 rounded-full transition-all",
                                    i === index ? "scale-125 bg-white" : "bg-white/50"
                                )}
                            />
                        ))}
                    </div>
                );
            case "flashCard":
                return (
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-2">
                        {visibleItems.map((_, i) => {
                            const realIndex = start + i;
                            const relativeIndex = realIndex - index;

                            return (
                                <button
                                    key={realIndex}
                                    onClick={() => setIndex(realIndex)}
                                    className={cn(
                                        "w-7 origin-bottom rounded-sm bg-white transition-all duration-700 ease-out",
                                        relativeIndex === 0 && "h-2 scale-110 opacity-100",
                                        relativeIndex === 1 && "h-1.5 scale-105 opacity-80",
                                        relativeIndex === -1 && "h-1.5 opacity-70",
                                        Math.abs(relativeIndex) === 2 && "h-1 opacity-40"
                                    )}
                                />
                            );
                        })}
                    </div>
                );
            default:
                return null;
        }
    };

    if (length === 0) return null;

    return (
        <div className={cn(carouselVariants({ variant, type }), className)}>
            <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {items.map((item, i) => (
                    <div key={i} className={cn("w-full shrink-0", itemClassName)}>
                        {renderItem(item, i)}
                    </div>
                ))}
            </div>

            {showArrows && getArrowByType(type)}

            {showDots && getDotByType(type)}
        </div>
    );
};

Carousel.displayName = "Carousel";
export default Carousel;
