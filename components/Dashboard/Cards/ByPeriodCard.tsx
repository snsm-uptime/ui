import CardHeaderSwitch from "@/components/Generic/CardHeaderSwitch";
import { DateRange, TimePeriod, TimePeriodOptions } from "@/types";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { ReactNode } from "react";

export default function ByPeriodCard({
    generateBody,
    selectedPeriod,
    onTabUpdate,
}: {
    generateBody: (period: TimePeriod, range: DateRange) => ReactNode;
    selectedPeriod: TimePeriod;
    onTabUpdate: (period: TimePeriod) => void;
}) {
    const options: Record<TimePeriod, string> = {
        "daily": "Today",
        "weekly": "This Week",
        "monthly": "This Month",
        "yearly": "This Year",
    }

    return (
        <Card>
            <CardHeaderSwitch
                options={options}
                onChange={(label) => {
                    const period = label as TimePeriod;
                    onTabUpdate(period);
                }}
                currentKey={selectedPeriod} />
            <Divider />
            <CardBody>
                {generateBody(selectedPeriod, TimePeriodOptions[selectedPeriod].getRange())}
            </CardBody>
        </Card>
    );
}
