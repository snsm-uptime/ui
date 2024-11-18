import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// Define a type for the allowed options
type FetchOption = "month" | "today" | "custom";

const options: Record<FetchOption, { label: string; description: string }> = {
    today: {
        label: "Today",
        description: "Refresh Today's Content",
    },
    month: {
        label: "Pick a month",
        description: "Select a month to fetch data from",
    },
    custom: {
        label: "Select your range",
        description: "Set a specific range of dates to fetch content from",
    },
};

export default function RefreshTransactionTable() {
    const [selectedOption, setSelectedOption] = useState<FetchOption>("month");

    return (
        <ButtonGroup variant="flat">
            <Button startContent={
                <ArrowDownTrayIcon color="primary" className="size-5" />
            }>{options[selectedOption].label}</Button>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Button isIconOnly>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Fetch options"
                    selectedKeys={new Set([selectedOption])}
                    selectionMode="single"
                    onSelectionChange={(keys) =>
                        setSelectedOption(Array.from(keys)[0] as FetchOption)
                    }
                    className="max-w-[300px]"

                >
                    <DropdownItem key="today" description={options["today"].description}>
                        {options["today"].label}
                    </DropdownItem>
                    <DropdownItem key="month" description={options["month"].description}>
                        {options["month"].label}
                    </DropdownItem>
                    <DropdownItem key="custom" description={options["custom"].description}>
                        {options["custom"].label}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    );
}
