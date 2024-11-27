import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import React, { useRef } from "react";

interface CarouselProps {
    items: React.ReactNode[];
    leftButton?: React.ReactNode; // Optional custom left button
    rightButton?: React.ReactNode; // Optional custom right button
    onScrollEnd?: (direction: "left" | "right") => void; // Optional callback
}

export default function Carousel({ items, leftButton, rightButton, onScrollEnd }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;

        const scrollAmount = direction === "left"
            ? -carouselRef.current.offsetWidth
            : carouselRef.current.offsetWidth;

        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

        if (onScrollEnd) onScrollEnd(direction);
    };

    const renderButton = (direction: "left" | "right", customButton?: React.ReactNode) => {
        const positionClass = direction === "left" ? "left-0" : "right-0";

        const defaultButton = (
            <Button
                onClick={() => scroll(direction)}
                isIconOnly
                aria-label={`Scroll ${direction}`}
                className={`absolute z-10 top-1/2 -translate-y-1/2 ${positionClass} bg-black/50 hover:bg-black/70 text-white rounded-full p-3`}
            >
                {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Button>
        );

        return customButton
            ? React.cloneElement(customButton as React.ReactElement, { onClick: () => scroll(direction) })
            : defaultButton;
    };

    return (
        <div className="relative overflow-hidden rounded-lg border border-gray-300 shadow-md">
            {/* Left Button */}
            {renderButton("left", leftButton)}

            {/* Carousel Items */}
            <div
                ref={carouselRef}
                className="flex scrollbar-hide p-4 space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 snap-center w-auto"
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Right Button */}
            {renderButton("right", rightButton)}
        </div>
    );
}
