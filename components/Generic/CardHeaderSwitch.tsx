import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";

interface CardHeaderSwitchProps {
    options: Record<string, string>; // Key-value pairs for options
    onChange: (currentKey: string) => void; // Callback with the current key
}

const CardHeaderSwitch: React.FC<CardHeaderSwitchProps> = ({ options, onChange }) => {
    const optionKeys = Object.keys(options); // Extract the keys
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + optionKeys.length) % optionKeys.length;
        setCurrentIndex(newIndex);
        onChange(optionKeys[newIndex]); // Pass the new key to the callback
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % optionKeys.length;
        setCurrentIndex(newIndex);
        onChange(optionKeys[newIndex]); // Pass the new key to the callback
    };

    const currentKey = optionKeys[currentIndex];
    const currentLabel = options[currentKey];

    return (
        <div className="flex items-center justify-between bg-[var(--bg-z1)] p-4 rounded-t">
            <Tooltip
                placement="top"
                content={options[optionKeys[(currentIndex - 1 + optionKeys.length) % optionKeys.length]]}
            >
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

            <span className="text-lg font-bold text-[var(--h1)]">{currentLabel}</span>

            <Tooltip
                placement="top"
                content={options[optionKeys[(currentIndex + 1) % optionKeys.length]]}
            >
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
