import React from "react";
import { Pagination } from "@nextui-org/react";
import { Pagination as PaginationSchema } from "@/models";
import FetchOptionsDropdown from "@/app/transactions/components/FetchOptionsDropdown";

interface TableFooterProps {
    pagination: PaginationSchema | null;
    hideFetchDropdown?: boolean;
    onPageChange?: (page: number) => void;
    onPullComplete?: () => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
    pagination,
    hideFetchDropdown = false,
    onPageChange,
    onPullComplete,
}) => {
    return (
        <div className="flex justify-between items-center">
            {pagination && pagination.total_pages > 0 && (
                <Pagination
                    showControls
                    showShadow
                    color="primary"
                    page={pagination.page}
                    total={pagination.total_pages}
                    onChange={onPageChange}
                />
            )}
            {onPullComplete && !hideFetchDropdown && <FetchOptionsDropdown onPullComplete={onPullComplete} />}
        </div>
    );
};

export default TableFooter;
