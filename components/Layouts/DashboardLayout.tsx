import { CardContent } from "@/types";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import clsx from "clsx";
import React, { ReactNode } from "react";

const CARD_HEIGHT = "h-[200px]";

interface DashboardLayoutProps {
    rowItems: CardContent[];
    topLeft: CardContent;
    bottomLeft: CardContent;
    right: ReactNode;
}

export default function DashboardLayout({ rowItems, topLeft, bottomLeft, right }: DashboardLayoutProps) {
    return (
        <div className="h-full flex flex-col gap-4">
            {/* First Row */}
            <div className="flex flex-wrap gap-4">
                {rowItems.map((content, index) => (
                    <Card key={index} className={clsx("flex-1 min-w-[200px]", CARD_HEIGHT)}>
                        {content.header && <CardHeader>{content.header}</CardHeader>}
                        <Divider />
                        {content.body && <CardHeader>{content.body}</CardHeader>}
                        {content.footer && <CardHeader>{content.footer}</CardHeader>}
                    </Card>
                ))}
            </div>

            {/* Second Row */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-x-0 lg:gap-4">
                {/* First Column */}
                <div className="grid grid-rows-[auto,1fr] gap-4">
                    {/* Top Left Card */}
                    <Card className={CARD_HEIGHT}>
                        {topLeft.header && <CardHeader>{topLeft.header}</CardHeader>}
                        <Divider />
                        {topLeft.body && <CardBody>{topLeft.body}</CardBody>}
                        {topLeft.footer && <CardFooter>{topLeft.footer}</CardFooter>}
                    </Card>
                    {/* Bottom Left Card */}
                    <Card className="flex-grow">
                        {bottomLeft.header && <CardHeader>{bottomLeft.header}</CardHeader>}
                        {bottomLeft.body && <CardBody>{bottomLeft.body}</CardBody>}
                        {bottomLeft.footer && <CardFooter>{bottomLeft.footer}</CardFooter>}
                    </Card>
                </div>
                {/* Right Card */}
                <div className=" md:col-span-2">{right}</div>
            </div>
        </div>
    );
}
