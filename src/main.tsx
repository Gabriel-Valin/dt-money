import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { createServer, Model } from 'miragejs'

createServer({
  models: {
    transaction: Model,
  },

  seeds (server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Aluguel Casa',
          typeTransaction: 'withdraw',
          value: 1200,
          category: 'Despesas',
          created_At: new Date('2021-12-26 10:00:00')
        },
        {
          id: 2,
          title: 'Mega Sena',
          typeTransaction: 'deposit',
          value: 25000000,
          category: 'Sorte',
          created_At: new Date('2021-12-27 10:00:00')
        }
      ]
    })
  },

  routes () {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
