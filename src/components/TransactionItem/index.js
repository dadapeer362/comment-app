// Write your code here
import {Component} from 'react'
import './index.css'

const deleteImgUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/delete.png'

class TransactionItem extends Component {
  onDeleteHistoryItem = () => {
    const {historyItem, deleteFunction} = this.props

    deleteFunction(historyItem)
  }

  render() {
    const {historyItem, deleteFunction} = this.props
    const {id, title, amount, option} = historyItem
    return (
      <li className="history-item-container">
        <p className="history-item title-item">{title}</p>
        <p className="history-item amount-item">{amount}</p>
        <p className="history-item type-item">{option}</p>
        <button
          type="button"
          testid="delete"
          className="button-delete"
          onClick={this.onDeleteHistoryItem}
        >
          <img className="delete-img" src={deleteImgUrl} alt="delete" />
        </button>
      </li>
    )
  }
}

export default TransactionItem
