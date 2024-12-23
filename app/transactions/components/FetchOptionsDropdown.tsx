import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    DatePicker,
    DateRangePicker,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spinner,
} from "@nextui-org/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getNow, formatDate } from "@/utils/date";
import { FetchOption } from "@/types";
import IconDropdownMenuComponent from "../../../components/Generic/IconDropdownMenuComponent";
import { usePullTransactions } from "@/hooks/usePullTransactions";
import { startOfToday, startOfTomorrow } from "date-fns";

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
        label: "Select dates",
        description: "Set a specific range of dates to fetch content from",
    },
};

interface DropdownWithDynamicButtonProps {
    onPullComplete: () => void; // Callback function
    variant?: "bordered" | "flat" | "faded" | "ghost" | "solid" | "light" | "shadow" | undefined
}

export default function DropdownWithDynamicButton({
    onPullComplete,
    variant
}: DropdownWithDynamicButtonProps) {

    const [selectedOption, setSelectedOption] = useState<FetchOption>("today");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedRange, setSelectedRange] = useState<{
        start: string | null;
        end: string | null;
    }>({ start: null, end: null });
    const { pullTransactions, isLoading } = usePullTransactions();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleButtonClick = async () => {
        setIsOpen(false);
        switch (selectedOption) {
            case "today": {
                await pullTransactions({
                    start_date: formatDate(startOfToday()),
                    end_date: formatDate(startOfTomorrow()),
                });
                break;
            }
            case "month":
                if (selectedDate) {
                    const selected = new Date(selectedDate);
                    const firstDayOfMonth = new Date(
                        selected.getFullYear(),
                        selected.getMonth(),
                        1
                    );
                    const lastDayOfMonth = new Date(
                        selected.getFullYear(),
                        selected.getMonth() + 1,
                        0
                    );
                    await pullTransactions({
                        start_date: formatDate(firstDayOfMonth),
                        end_date: formatDate(lastDayOfMonth),
                    });
                }
                break;

            case "custom": {
                if (selectedRange.start && selectedRange.end) {
                    await pullTransactions({
                        start_date: selectedRange.start,
                        end_date: selectedRange.end,
                    });
                }
                break;
            }
        }
        onPullComplete();
    };

    const renderPopoverContent = () => {
        switch (selectedOption) {
            case "month":
                return (
                    <DatePicker
                        aria-label="Select a month"
                        showMonthAndYearPickers
                        onChange={(date) =>
                            setSelectedDate(date ? formatDate(date.toDate("CST")) : null)
                        }
                    />
                );
            case "custom":
                return (
                    <DateRangePicker
                        aria-label="Select a range"
                        variant="bordered"
                        onChange={(range) =>
                            setSelectedRange({
                                start: range.start ? formatDate(range.start.toDate("CST")) : null,
                                end: range.end ? formatDate(range.end.toDate("CST")) : null,
                            })
                        }
                    />
                );
        }
    };

    const RefreshIcon = isLoading ? (
        <Spinner size="sm" color="primary" />
    ) : (
        <ArrowDownTrayIcon className="size-5" />
    );

    return (
        <div className="flex flex-col items-center space-y-2 w-56">
            <ButtonGroup variant={variant} fullWidth>
                {selectedOption !== "today" ? (
                    <Popover placement="bottom" onClose={() => { setIsOpen(false) }} showArrow isOpen={isOpen}>
                        <PopoverTrigger >
                            <Button
                                startContent={RefreshIcon}
                                isDisabled={isLoading}
                                onClick={() => setIsOpen(true)}
                            >
                                {options[selectedOption].label}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="grid gap-2 py-2">
                                {renderPopoverContent()}
                                <Button variant="flat" size="sm" className="rounded-lg" isDisabled={isLoading} onClick={handleButtonClick}>Pull</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Button
                        startContent={RefreshIcon}
                        onClick={handleButtonClick}
                        isDisabled={isLoading} // Disable button when loading
                    >
                        {options[selectedOption].label}
                    </Button>
                )}
                <IconDropdownMenuComponent
                    options={options}
                    selectedOption={selectedOption}
                    onOptionChange={(option) => {
                        if (option != "today") setIsOpen(true);
                        setSelectedOption(option);
                    }}
                />
            </ButtonGroup>
            <span className="text-xs text-gray-500">
                {isLoading ? "Processing emails..." : "Pull emails from your inbox"}
                {/* TODO: Tell the user how many were found  */}
            </span>
        </div>
    );
}
