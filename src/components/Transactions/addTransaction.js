import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { addTransaction } from '../../services/transactions'
import { getAccounts } from '../../services/accounts'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './transactions.css'
import Toast from 'light-toast'

class AddTransactions extends React.Component {
    state = {
        accounts: [],
        onAddTransaction: false
    }
    async  componentWillMount() {
        let acc = await getAccounts()
        await this.setState({ accounts: acc })
        this.props.handleTransactionType('')
        this.props.handleAccountName('')
        this.props.handleDescription('')
        this.props.handleAmount('')
        this.props.handleDate('')
        this.setState({ onAddTransaction: false })
    }
    handleAddTransaction = async () => {
        let transaction = {
            transactionType: this.props.transactionType,
            description: this.props.description,
            amount: this.props.amount,
            date: this.props.date,
            accountName: this.props.accountName
        }
        if (!this.props.accountName)
            transaction = {
                ...transaction,
                accountName: this.props.accountClicked
            }
        let onAddTransaction = await addTransaction(transaction)
        if (onAddTransaction) {
          await  this.setState({ onAddTransaction: true })
          //  this.props.onAddTransaction(true)
        }
        else
            this.setState({onAddTransaction:false})
        this.props.handleTransactionType('')
        this.props.handleAccountName('')
        this.props.handleDescription('')
        this.props.handleAmount('')
        this.props.handleDate('')
        Toast.success("added transaction successfully", 500)
    }
    handleTransactionType = (e) => {
        this.props.handleTransactionType(e.target.value)
    }
    handleAccountName = (e) => {
        this.props.handleAccountName(e.target.value)
    }
    handleDescription = (e) => {
        this.props.handleDescription(e.target.value)
    }
    handleAmount = (e) => {
        this.props.handleAmount(e.target.value)
    }
    handleDate = (date) => {
        this.props.handleDate(date)
    }
    render() {
        return (
            <div style={{ textAlign: "left", marginLeft: "50px" }}>
                <h2> TRANSACTION</h2>
                <input type="radio" value="income" checked={this.props.transactionType === "income"} style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                <label style={{ marginRight: "25px", fontWeight: "bold", fontSize: "large" }}>Income</label>
                <input type="radio" value="expense" checked={this.props.transactionType === "expense"} style={{ margin: "5px" }} onChange={this.handleTransactionType} />
                <label style={{ fontWeight: "bold", fontSize: "large" }}>Expense</label>
                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Description</label>
                    <br />
                    <input type="text" onChange={this.handleDescription} value={this.props.description} className="InputField"></input>
                </div>
                {this.props.accountClicked ?
                    <div style={{ margin: "10px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "large" }}>Account</label>
                        <br />
                        <select value={this.props.accountClicked} onChange={this.handleAccountName} className="InputField" disabled>
                            <option label={this.props.accountClicked} ></option>
                        </select>
                    </div>
                    :
                    <div style={{ margin: "10px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "large" }}>Account</label>
                        <br />
                        <select value={this.props.accountName} onChange={this.handleAccountName} className="InputField">
                            <option label="Select an Account "></option>
                            {this.state.accounts.map(obj => {
                                return (<option label={obj.accountName}>{obj.accountName}</option>);
                            })}
                        </select>
                    </div>
                }
                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Amount</label>
                    <br />
                    <input type="text" onChange={this.handleAmount} value={this.props.amount} className="InputField"></input>
                </div>
                <div style={{ margin: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "large" }}>Date</label>
                    <br />
                    <DatePicker
                        dateFormat='dd-MM-yyyy'
                        selected={this.props.date}
                        onChange={this.handleDate}
                        value={this.props.date}
                        className="InputField"
                    />
                </div>
                <button onClick={this.handleAddTransaction} className="AddTranscButton" style={{ marginLeft: "50px" ,height:"50px" , width:"200px"}}> Add Transaction</button>
                {this.state.onAddTransaction ? <Redirect to='/accounts'></Redirect> : null}
            </div>
        )
    }
}
export default AddTransactions