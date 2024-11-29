import { CardContent } from "@/types";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import clsx from "clsx";
import React, { ReactNode } from "react";

const CARD_HEIGHT = "h-[200px]";

interface DashboardLayoutProps {
    rowItems: CardContent[]; // List of items for the first row
    topLeft: CardContent; // Component for the top-left card (Card 7)
    bottomLeft: CardContent; // Component for the bottom-left card (Card 8)
    right: ReactNode; // Component for the right card (Card 9)
}

export default function DashboardLayout({ rowItems, topLeft, bottomLeft, right }: DashboardLayoutProps) {
    return (
        <div className="h-full flex flex-col gap-4">
            {/* First Row */}
            <div className="flex flex-wrap gap-4">
                {rowItems.map((content, index) => (
                    <Card key={index} className={clsx("flex-1 min-w-[200px]", CARD_HEIGHT)}>
                        {content.header}
                        {content.body}
                        {content.footer}
                    </Card>
                ))}
            </div>

            {/* Second Row */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-x-0 lg:gap-4">
                {/* First Column */}
                <div className="grid grid-rows-[auto,1fr] gap-4 md:col-span-2">
                    {/* Top Left Card */}
                    <Card className={CARD_HEIGHT}>
                        {topLeft.header}
                        {topLeft.body}
                        {topLeft.footer}
                    </Card>
                    {/* Bottom Left Card */}
                    <Card className="bg-white shadow-md rounded-lg p-4 flex-grow">
                        {bottomLeft.header}
                        {bottomLeft.body}
                        {bottomLeft.footer}
                    </Card>
                </div>
                {/* Right Card */}
                <div className="bg-white shadow-md rounded-lg p-4">{right}</div>
            </div>
        </div>
    );
}
