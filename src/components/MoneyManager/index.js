import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    historyList: [],
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  }

  onDeleteItem = historyItem => {
    const {historyList} = this.state
    const {id, title, amount, option} = historyItem
    const filteredHistoryList = historyList.filter(
      eachItem => eachItem.id !== id,
    )
    if (option === 'INCOME') {
      this.setState(prevState => ({
        totalIncome: prevState.totalIncome - amount,
      }))
    } else {
      this.setState(prevState => ({
        totalExpenses: prevState.totalExpenses - amount,
      }))
    }
    this.setState(prevState => ({
      historyList: filteredHistoryList,
      totalBalance: prevState.totalIncome - prevState.totalExpenses,
    }))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {
      titleInput,
      amountInput,
      optionId,
      historyList,
      totalBalance,
      totalIncome,
      totalExpenses,
    } = this.state
    if (titleInput !== '' && amountInput !== '') {
      if (optionId === 'INCOME') {
        this.setState(prevState => ({
          totalIncome: prevState.totalIncome + parseInt(amountInput),
        }))
      } else {
        this.setState(prevState => ({
          totalExpenses: prevState.totalExpenses + parseInt(amountInput),
        }))
      }
      const newHistoryList = {
        id: uuidv4(),
        title: titleInput,
        amount: amountInput,
        option: optionId,
      }
      this.setState(prevState => ({
        historyList: [...prevState.historyList, newHistoryList],
        titleInput: '',
        amountInput: '',
        optionId: transactionTypeOptions[0].optionId,
        totalBalance: prevState.totalIncome - prevState.totalExpenses,
      }))
    }
  }

  onGetTitle = event => {
    const {titleInput} = this.state
    this.setState({titleInput: event.target.value})
  }

  onGetAmount = event => {
    const {amountInput} = this.state
    this.setState({amountInput: event.target.value})
  }

  onGetOption = event => {
    const {optionId} = this.state
    this.setState({optionId: event.target.value})
  }

  onGetFormLayout = () => {
    const {titleInput, amountInput, optionId, historyList} = this.state

    return (
      <form className="form" onSubmit={this.onSubmitForm}>
        <h1 className="form-heading">Add Transaction</h1>
        <label className="label" htmlFor="title">
          TITLE
        </label>
        <br />
        <input
          className="input"
          type="text"
          id="title"
          placeholder="TITLE"
          value={titleInput}
          onChange={this.onGetTitle}
        />
        <br />
        <label className="label" htmlFor="amount">
          AMOUNT
        </label>
        <br />
        <input
          className="input"
          type="text"
          id="amount"
          placeholder="AMOUNT"
          value={amountInput}
          onChange={this.onGetAmount}
        />
        <label className="label" htmlFor="dropdown">
          TYPE
        </label>
        <select
          id="dropdown"
          className="dropdown-select"
          onChange={this.onGetOption}
          value={optionId}
        >
          {transactionTypeOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              id={eachOption.optionId}
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
    )
  }

  onGetHistoryLayout = () => {
    const {titleInput, amountInput, optionId, historyList} = this.state
    return (
      <div className="history-container">
        <h1>History</h1>
        <ul>
          <li className="history-header-container">
            <p className="header-item">Title</p>
            <p className="header-item">Amount</p>
            <p className="header-item">Type</p>
            <p className="header-item">DELETE</p>
          </li>
          {historyList.map(eachItem => (
            <TransactionItem
              key={eachItem.id}
              historyItem={eachItem}
              deleteFunction={this.onDeleteItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {
      titleInput,
      amountInput,
      optionId,
      historyList,
      totalBalance,
      totalIncome,
      totalExpenses,
    } = this.state
    console.log(historyList)
    return (
      <div className="bg-container">
        <div className="profile-card-container">
          <h1 className="name-heading">Hi, Richard</h1>
          <p className="name-para">
            Welcome back to your{' '}
            <span className="span-money-manager">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />
        <div className="form-history-container">
          {this.onGetFormLayout()}
          {this.onGetHistoryLayout()}
        </div>
      </div>
    )
  }
}

export default MoneyManager
