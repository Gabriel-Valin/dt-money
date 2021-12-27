import Modal from 'react-modal'
import { Container, TypeTransaction, CustomRadioBox } from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useState } from 'react'

type TransactionModal = {
    isOpen: boolean
    onRequestClose: () => void
}

export const TransactionModal = ({ isOpen, onRequestClose }: TransactionModal) => {
    const [typeTransaction, setTypeTransaction] = useState('deposit')

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
            <Container>
                <h2>Cadastrar Transação</h2>
                <input placeholder='Título' />
                <input type='number' placeholder='Valor' />
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
                <input placeholder='Categoria' />
                <button type='submit'>Cadastrar</button>
            </Container>
      </Modal>
    )
}