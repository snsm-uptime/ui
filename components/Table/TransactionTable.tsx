import React from "react";
import { Pagination, Spinner } from "@nextui-org/react";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Transaction } from "@/models/Transaction";
import { Pagination as PaginationSchema } from "@/models";

interface TransactionTableProps {
    transactions: Transaction[];
    isLoading: boolean;
    pagination: PaginationSchema | null;
    onPageChange?: ((page: number) => void) | undefined | null;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, isLoading, pagination, onPageChange }) => {
    return (
        <Table
            aria-label="Example table with client async pagination"
            bottomContent={
                onPageChange && pagination && pagination.total_pages > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={pagination.page}
                            total={pagination.total_pages}
                            onChange={onPageChange}
                        />
                    </div>
                ) : null
            }
        >
            <TableHeader>
                <TableColumn key="date">Date</TableColumn>
                <TableColumn key="business">Business</TableColumn>
                <TableColumn key="value">Value</TableColumn>
                <TableColumn key="currency">Currency</TableColumn>
                <TableColumn key="bank_name">Bank_name</TableColumn>
                <TableColumn key="business_type">Business Type</TableColumn>
            </TableHeader>
            <TableBody
                items={transactions}
                loadingContent={<Spinner />}
                loadingState={isLoading ? "loading" : "idle"}
            >
                {(item) => (
                    <TableRow key={item?.id}>
                        {(columnKey) => columnKey === "date" ? <TableCell>date</TableCell> : <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>

    );
};

export default TransactionTable;
