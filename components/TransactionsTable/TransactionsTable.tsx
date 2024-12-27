import React from "react";
import { Spinner } from "@nextui-org/react";
import {
    getKeyValue,
    Selection,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import { Transaction } from "@/models/Transaction";
import { Pagination as PaginationSchema } from "@/models";
import { SelectionMode } from "@nextui-org/table";
import TableFooter from "./TableFooter";
import { formatDate } from "@/utils/date";

interface TransactionTableProps {
    transactions: Transaction[];
    isLoading: boolean;
    pagination: PaginationSchema | null;
    onPullComplete: () => void;
    onPageChange?: (page: number) => void;
    onSelectionChange?: (keys: Selection) => void;
    selectionMode?: SelectionMode;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
    transactions,
    isLoading,
    pagination,
    selectionMode = "none",
    onPageChange,
    onPullComplete,
    onSelectionChange,
}) => {
    return (
        <Table
            aria-label="Transaction table with client async pagination"
            selectionMode={selectionMode}
            color="secondary"
            onSelectionChange={onSelectionChange}
            bottomContent={
                <TableFooter
                    pagination={pagination}
                    onPageChange={onPageChange}
                    onPullComplete={onPullComplete}
                />
            }
        >
            <TableHeader>
                <TableColumn key="date">Date</TableColumn>
                <TableColumn key="business">Business</TableColumn>
                <TableColumn key="value" className="text-right">
                    Value
                </TableColumn>
                <TableColumn key="currency">Currency</TableColumn>
                <TableColumn key="bank_name">Bank Name</TableColumn>
            </TableHeader>
            <TableBody
                items={transactions}
                loadingContent={<Spinner />}
                loadingState={isLoading ? "loading" : "idle"}
            >
                {(item) => (
                    <TableRow key={item?.id}>
                        {(columnKey) => {
                            switch (columnKey) {
                                case "date":
                                    return (
                                        <TableCell>
                                            {item.date ? formatDate(new Date(item.date)) : "N/A"}
                                        </TableCell>
                                    );
                                case "value":
                                    return (
                                        <TableCell className="text-right">
                                            {item.value.toFixed(2)}
                                        </TableCell>
                                    );
                                default:
                                    return (
                                        <TableCell>{getKeyValue(item, columnKey) ?? "N/A"}</TableCell>
                                    );
                            }
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TransactionTable;
