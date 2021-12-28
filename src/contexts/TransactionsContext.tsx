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

type InputTransaction = Omit<Transaction, 'id' | 'created_At'>

type ContextProps = {
    children: ReactNode
}

type TransactionsContextValues = {
    transactions: Transaction[]
    createTransaction: (transaction: InputTransaction) => void
}

export const TransactionsContext = createContext<TransactionsContextValues>({} as TransactionsContextValues)

const createTransaction = (transaction: InputTransaction) => {

    api.post('transactions', transaction)
}

export const TransactionsProvider = ({ children }: ContextProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}