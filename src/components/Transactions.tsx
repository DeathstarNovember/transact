import { Data, TransactionsProps } from '../types'
import { Card } from './card';



export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  dismissItem,
}) => {
  if (!transactions) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {transactions.map((transaction: Data, index: number) => {
        
        const backgroundColor = transaction.Status === "COMPROMISED" ? "yellow" : "red"
        
        return (
          <Card
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              textAlign: "center",
              gap: "10px",
              width: "300px",
              border: "1px solid black",
              padding: "1em",
              backgroundColor: backgroundColor,
            }}
            key={`transaction${index}`}
          >
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "0.25em" }}>
                Date
              </div>
              <div>{transaction.Date}</div>
            </div>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "0.25em" }}>
                Amount
              </div>
              <div>${transaction.Amount}</div>
            </div>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "0.25em" }}>
                Status
              </div>
              <div>{transaction.Status}</div>
            </div>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "0.25em" }}>
                Description
              </div>
              <div>{transaction.Memo}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
                backgroundColor: backgroundColor,
              }}
            >
              <button>Change Password</button>
              <button onClick={() => dismissItem(transaction.Id)}>
                Dismiss
              </button>
            </div>
          </Card>
        );})}
    </div>
  );
};
