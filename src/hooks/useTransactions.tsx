import { createContext, ReactNode, useContext, useEffect, useState } from "react";
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
    createTransaction: (transaction: InputTransaction) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextValues>({} as TransactionsContextValues)

export const TransactionsProvider = ({ children }: ContextProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const createTransaction = async (transactionInput: InputTransaction) => {
        const response = await api.post('transactions', {...transactionInput, created_At: new Date() })
        const { transaction } = response.data
    
        setTransactions([ ...transactions, transaction ])
    }

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

export const useTransactions = () => {
    const context = useContext(TransactionsContext)
    return context
}