import React, { useState } from "react";
import { Button, ButtonGroup, DatePicker, DateRangePicker, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getStartOfToday, getNow, formatDate } from "@/utils/date";
import { FetchOption } from "@/types";
import IconDropdownMenuComponent from "../Generic/IconDropdownMenuComponent";
import { usePullTransactions } from "@/hooks/usePullTransactions";

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

export default function DropdownWithDynamicButton() {
    const [selectedOption, setSelectedOption] = useState<FetchOption>("today");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedRange, setSelectedRange] = useState<{
        start: string | null;
        end: string | null;
    }>({ start: null, end: null });

    const handleButtonClick = () => {
        switch (selectedOption) {
            case "today":
                const todayStart = getStartOfToday();
                const now = getNow();
                usePullTransactions(todayStart, now);
                break;
            case "month":
                if (selectedDate) {
                    console.log("Fetching data for month:", new Date(selectedDate).getMonth() + 1);
                }
                break;
            case "custom":
                if (selectedRange.start && selectedRange.end) {
                    console.log(
                        "Fetching data from range:",
                        selectedRange.start,
                        "to",
                        selectedRange.end
                    );
                }
                break;
        }
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
                return <DateRangePicker
                    aria-label="Select a range"
                    variant="bordered"
                    onChange={(range) =>
                        setSelectedRange({
                            start: range.start ? formatDate(range.start.toDate("CST")) : null,
                            end: range.end ? formatDate(range.end.toDate("CST")) : null,
                        })
                    }
                />
        }
    };

    return (
        <ButtonGroup variant="flat">
            {
                selectedOption != "today" ?
                    <Popover placement="bottom" showArrow>
                        <PopoverTrigger>
                            <Button>{options[selectedOption].label}</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            {renderPopoverContent()}
                        </PopoverContent>
                    </Popover>
                    :
                    <Button onClick={handleButtonClick}>{options[selectedOption].label}</Button>
            }
            <IconDropdownMenuComponent
                options={options}
                selectedOption={selectedOption}
                onOptionChange={(option) => setSelectedOption(option)}
            />
        </ButtonGroup>
    );
}
