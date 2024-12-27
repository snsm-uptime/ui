import React from "react";
import { Pagination } from "@nextui-org/react";
import FetchOptionsDropdown from "@/app/transactions/components/FetchOptionsDropdown";

interface TableFooterProps {
    pagination: {
        page: number;
        total_pages: number;
    } | null;
    onPageChange?: (page: number) => void;
    onPullComplete: () => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
    pagination,
    onPageChange,
    onPullComplete,
}) => {
    if (!pagination || pagination.total_pages <= 1) return null;

    return (
        <div className="flex justify-between items-center py-4 px-2">
            <Pagination
                showControls
                showShadow
                color="primary"
                page={pagination.page}
                total={pagination.total_pages}
                onChange={onPageChange}
            />
            <FetchOptionsDropdown onPullComplete={onPullComplete} />
        </div>
    );
};

export default React.memo(TableFooter);
