import CurrecySpan from "@/components/FormattedText/CurrencySpan";
import TableDetailCard from "@/components/Table/TableDetailCard";
import { Transaction } from "@/models";
import { Currency } from "@/types";
import React from "react";

export default function TransactionSelectionStats({ selections }: { selections: Transaction[] }) {
    const SelectedTotal = (): React.ReactNode => {
        const crc = selections.filter(transactions => transactions.currency === "CRC")
        const usd = selections.filter(transactions => transactions.currency === "USD")
        let valCRC = crc.reduce((sum, transaction) => sum + transaction.value, 0);
        let valUSD = usd.reduce((sum, transaction) => sum + transaction.value, 0);

        return <div className="flex flex-row space-x-2">
            <CurrecySpan value={valCRC} currency={Currency.CRC} />
            <CurrecySpan value={valUSD} currency={Currency.USD} />
        </div>
    }
    return (
        <TableDetailCard className="h-fit min-w-48"
            title={<span>Selection <span className="text-secondary">SUM</span></span>}
            subtitle={`${selections.length} Items Selected`}
            children={<h4>{SelectedTotal()}</h4>} />
    );

}