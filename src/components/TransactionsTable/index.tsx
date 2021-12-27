import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { Container } from "./styles"

type Transaction = {
    id: number
    title: string
    value: number
    category: string
    typeTransaction: string
    created_At: Date
}

export const TransactionTable = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.typeTransaction}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.value)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.created_At))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}