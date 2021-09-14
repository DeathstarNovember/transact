import { Component } from 'react'

type TransactionsProps = { transactions: any[] }

export class Transactions extends Component<TransactionsProps> {
  render() {
    console.log({ data: this.props.transactions })
    return (
      <div style={{ display: 'grid', gap: '20px' }}>
        {this.props.transactions.map((transaction: any, index: number) => (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              textAlign: 'center',
              gap: '10px',
              width: '300px',
              border: '1px solid black',
              padding: '1em',
            }}
            key={`transaction${index}`}
          >
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25em' }}>
                Amount
              </div>
              <div>${transaction.Amount}</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25em' }}>
                Status
              </div>
              <div>{transaction.Status}</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25em' }}>
                Description
              </div>
              <div>{transaction.Memo}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
