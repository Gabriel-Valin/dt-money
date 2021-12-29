import { useState } from 'react'
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { TransactionModal } from './components/TransactionModal';
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal'
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root')

export function App() {

  const [transactionModal, setTransactionModal] = useState(false);

  const handleOpenTransactionModal = () => {
    setTransactionModal(true)
  }

  const handleCloseTransactionModal = () => {
    setTransactionModal(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenTransactionModal={handleOpenTransactionModal}/>
      <Dashboard />
      <TransactionModal isOpen={transactionModal} onRequestClose={handleCloseTransactionModal} />
      <GlobalStyle />
    </TransactionsProvider>
  )
}
