import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type Transaction = {
    id: number
    title: string
    value: number
    category: string
    typeTransaction: string
    created_At: Date
}

type ContextProps = {
    children: ReactNode
}

export const TransactionsContext = createContext<Transaction[]>([])

export const TransactionsProvider = ({ children }: ContextProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    return (
        <TransactionsContext.Provider value={transactions}>
            {children}
        </TransactionsContext.Provider>
    )
}