import { Card, CardBody, CardHeader } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
export default function TableDetailCard({ className, children, title, subtitle, }: { className: string, title: string | React.ReactNode, subtitle?: string | React.ReactNode, children: React.ReactNode }) {

    return (
        <Card className={clsx("py-4 shadow-none", className)}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{title}</h4>
                {subtitle ? <small className="text-default-500">{subtitle}</small> : null}
            </CardHeader>
            <CardBody className="overflow-visible py-2">{children}</CardBody>
        </Card>
    );
}