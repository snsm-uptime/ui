"use client";
import React, { useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Selection,
    SelectionMode,
    getKeyValue,
} from "@nextui-org/table";
import { Transaction } from "@/models/Transaction";
import { Pagination as PaginationSchema, TransactionsResponse } from "@/models";
import TableFooter from "./TableFooter";
import { formatDate } from "@/utils/date";
import { useRouter, useSearchParams } from "next/navigation";

interface TransactionTableProps {
    fetchTransactions: (page: number, pageSize: number) => Promise<TransactionsResponse>;
    selectionMode?: SelectionMode;
    hideFetchDropdown?: boolean;
    onSelectionChange?: (keys: Selection) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
    fetchTransactions,
    selectionMode = "none",
    hideFetchDropdown = false,
    onSelectionChange,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("p") ?? "1");
    const currentPageSize = Number(searchParams.get("page-size") ?? process.env.DEFAULT_ROWS!);

    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [pagination, setPagination] = React.useState<PaginationSchema | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    // Fetch transactions whenever the current page changes
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchTransactions(currentPage, currentPageSize);
                setTransactions(response.data?.items ?? []);
                setPagination(response.data?.pagination ?? null);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [currentPage, fetchTransactions]);

    // Change the page in the URL
    const handlePageChange = (page: number) => {
        let path = `?p=${page}`
        if (currentPageSize != parseInt(process.env.DEFAULT_ROWS!))
            path += `&page-size=${currentPageSize}`;
        router.push(path, { scroll: false });
    };

    return (
        <Table
            aria-label="Transaction table with client async pagination"
            selectionMode={selectionMode}
            color="secondary"
            onSelectionChange={onSelectionChange}
            bottomContent={
                <TableFooter
                    pagination={pagination}
                    hideFetchDropdown={hideFetchDropdown}
                    onPageChange={handlePageChange}
                    onPullComplete={() => handlePageChange(currentPage)}
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
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                {columnKey === "date"
                                    ? formatDate(new Date(item.date))
                                    : getKeyValue(item, columnKey as keyof Transaction) ?? "N/A"}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TransactionTable;
