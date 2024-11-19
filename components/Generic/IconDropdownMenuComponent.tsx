"use client";
// TODO: Dynamic Icon

import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface DropdownMenuComponentProps<T extends string> {
    options: Record<T, { label: string; description: string }>;
    selectedOption: T;
    onOptionChange: (option: T) => void;
}

export default function IconDropdownMenuComponent<T extends string>({
    options,
    selectedOption,
    onOptionChange,
}: DropdownMenuComponentProps<T>) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button isIconOnly>
                    <ChevronDownIcon className="size-5" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Select an option"
                selectionMode="single"
                selectedKeys={new Set([selectedOption])}
                onSelectionChange={(keys) => {
                    const currentKey = keys.currentKey as T;
                    if (currentKey) {
                        onOptionChange(currentKey);
                    }
                }}
            >
                {Object.entries(options).map(([key, meta]) => {
                    const typedMeta = meta as { label: string; description: string };
                    return (
                        <DropdownItem key={key} description={typedMeta.description}>
                            {typedMeta.label}
                        </DropdownItem>
                    )
                })}
            </DropdownMenu>
        </Dropdown>
    );
}
