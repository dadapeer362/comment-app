import {Component} from 'react'
import './index.css'

const balanceImg =
  'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
const incomeImg =
  'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
const expensesImg =
  'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

class MoneyDetails extends Component {
  render() {
    const {totalBalance, totalIncome, totalExpenses} = this.props
    return (
      <div className="ul-container">
        <div className="list-item-money balance-border-background">
          <div className="img-container">
            <img className="money-img" src={balanceImg} alt="balance" />
          </div>
          <div className="text-amount-container">
            <p className="amount-text-para">Your Balance</p>
            <p className="amount-para" testid="balanceAmount">
              Rs {totalBalance}
            </p>
          </div>
        </div>
        <div className="list-item-money income-border-background">
          <div className="img-container">
            <img className="money-img" src={incomeImg} alt="income" />
          </div>
          <div className="text-amount-container">
            <p className="amount-text-para">Your Income</p>
            <p className="amount-para" testid="incomeAmount">
              Rs {totalIncome}
            </p>
          </div>
        </div>
        <div className="list-item-money expenses-border-background">
          <div className="img-container">
            <img className="money-img" src={expensesImg} alt="expenses" />
          </div>
          <div className="text-amount-container">
            <p className="amount-text-para">Your Expenses</p>
            <p className="amount-para" testid="expensesAmount">
              Rs {totalExpenses}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyDetails
