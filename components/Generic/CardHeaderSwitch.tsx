import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import React from "react";

interface CardHeaderSwitchProps {
    options: Record<string, string>; // Key-value pairs for options
    currentKey: string; // The currently selected key
    onChange: (newKey: string) => void; // Callback with the new key
}

const CardHeaderSwitch: React.FC<CardHeaderSwitchProps> = ({
    options,
    currentKey,
    onChange,
}) => {
    const optionKeys = Object.keys(options);

    // Get current index
    const currentIndex = optionKeys.indexOf(currentKey);

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + optionKeys.length) % optionKeys.length;
        onChange(optionKeys[newIndex]); // Pass the new key to the callback
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % optionKeys.length;
        onChange(optionKeys[newIndex]); // Pass the new key to the callback
    };

    const prevLabel =
        options[optionKeys[(currentIndex - 1 + optionKeys.length) % optionKeys.length]];
    const nextLabel = options[optionKeys[(currentIndex + 1) % optionKeys.length]];

    return (
        <div className="flex items-center justify-between bg-[var(--bg-z1)] p-4 rounded-t">
            <Tooltip placement="top" content={prevLabel}>
                <Button
                    isIconOnly
                    variant="light"
                    onClick={handlePrev}
                    aria-label="Previous"
                    size="sm"
                >
                    <ArrowLeftIcon className="size-5" />
                </Button>
            </Tooltip>

            <span className="text-lg font-bold text-[var(--h1)]">{options[currentKey]}</span>

            <Tooltip placement="top" content={nextLabel}>
                <Button
                    isIconOnly
                    variant="light"
                    onClick={handleNext}
                    aria-label="Next"
                    size="sm"
                >
                    <ArrowRightIcon className="size-5" />
                </Button>
            </Tooltip>
        </div>
    );
};

export default CardHeaderSwitch;
