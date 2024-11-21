import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import clsx from "clsx";
export default function TableDetailCard({ className, children, title, subtitle, }: { className: string, title: string | React.ReactNode, subtitle: string, children: React.ReactNode }) {

    return (
        <Card className={clsx("py-4", className)}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{title}</h4>
                <small className="text-default-500">{subtitle}</small>
            </CardHeader>
            <Divider orientation="horizontal" className="my-3" />
            <CardBody className="overflow-visible py-2">{children}</CardBody>
        </Card>
    );
}