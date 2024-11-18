import React from "react";
import { Button, Pagination, Spinner } from "@nextui-org/react";
import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import { Transaction } from "@/models/Transaction";
import { Pagination as PaginationSchema } from "@/models";
import RefreshTransactionTable from "../Refresh/RefreshTransactionTable";

interface TransactionTableProps {
    transactions: Transaction[];
    isLoading: boolean;
    pagination: PaginationSchema | null;
    onPageChange?: ((page: number) => void) | undefined | null;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
    transactions,
    isLoading,
    pagination,
    onPageChange,
}) => {
    // Helper function to format the date
    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date));
    };
    const buildPagination = () => {

        return onPageChange && pagination && pagination.total_pages > 0 ? (
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={pagination.page}
                total={pagination.total_pages}
                onChange={onPageChange}
            />
        ) : null;
    }

    return (
        <Table
            aria-label="Transaction table with client async pagination"
            bottomContent={
                <div className="flex justify-between items-center">
                    {buildPagination()}
                    <RefreshTransactionTable />
                </div>
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
                <TableColumn key="business_type">Business Type</TableColumn>
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
                                            {item.date ? formatDate(item.date) : "N/A"}
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
        </Table >
    );
};

export default TransactionTable;
