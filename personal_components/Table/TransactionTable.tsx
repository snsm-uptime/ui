import React from "react";
import { Transaction } from "@/models/Transaction";

interface TransactionTableProps {
    transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Value</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Currency</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Business</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Bank</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="border border-gray-200 px-4 py-2">
                                {new Date(transaction.date).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{transaction.value.toFixed(2)}</td>
                            <td className="border border-gray-200 px-4 py-2">{transaction.currency}</td>
                            <td className="border border-gray-200 px-4 py-2">{transaction.business}</td>
                            <td className="border border-gray-200 px-4 py-2">{transaction.bank_name}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                {transaction.expense_priority ?? "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
