import Modal from 'react-modal'
import { Container, TypeTransaction, CustomRadioBox } from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState, useContext } from 'react'
import { api } from '../../services/api'
import { TransactionsContext } from '../../contexts/TransactionsContext'

type TransactionModal = {
    isOpen: boolean
    onRequestClose: () => void
}

const initalTransactionData = {
    title: '',
    value: 0,
    category: ''
}

export const TransactionModal = ({ isOpen, onRequestClose }: TransactionModal) => {
    const { createTransaction } = useContext(TransactionsContext)

    const [typeTransaction, setTypeTransaction] = useState('deposit')
    const [transactionData, setTransactionData] = useState(initalTransactionData)


    const handleCreateNewTransaction = async (event: FormEvent) => {
        event.preventDefault()

        const payload = {...transactionData, typeTransaction}

        await createTransaction(payload)
        
        setTransactionData(initalTransactionData)
        onRequestClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >    
            <button type='button' onClick={onRequestClose} className='react-modal-close'>
                <img src={closeImg} alt="Fechar" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input 
                    placeholder='Título'
                    name='title'
                    value={transactionData.title}
                    onChange={event => setTransactionData({...transactionData, [event.target.name]: event.target.value })}
                />
                <input 
                    type='number' 
                    name='value'
                    value={transactionData.value}
                    placeholder='Valor'
                    onChange={event => setTransactionData({...transactionData, [event.target.name]: event.target.value })}
                />

                <TypeTransaction>
                    <CustomRadioBox 
                        type='button' 
                        onClick={() => setTypeTransaction('deposit')}
                        isActive={typeTransaction === 'deposit'}
                        activeColor='green'
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entradas</span>
                    </CustomRadioBox>
                    <CustomRadioBox 
                        type='button' 
                        onClick={() => setTypeTransaction('withdraw')}
                        isActive={typeTransaction === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </CustomRadioBox>
                </TypeTransaction>

                <input 
                    placeholder='Categoria'
                    name='category'
                    value={transactionData.category}
                    onChange={event => setTransactionData({...transactionData, [event.target.name]: event.target.value })}
                />
                <button 
                    type='submit'
                >
                    Cadastrar
                </button>
            </Container>
      </Modal>
    )
}