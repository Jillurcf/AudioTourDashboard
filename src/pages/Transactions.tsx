import React from 'react'
import TransactionsStatus from '../component/Transactions/TransactionStatus'
import TransactionTable from '../component/Transactions/TransactionsTable'

type Props = {}

const Transactions = (props: Props) => {
  return (
    <div>
      {/* <TransactionsStatus /> */}
      <TransactionTable />
    </div>
  )
}

export default Transactions