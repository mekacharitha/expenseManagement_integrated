import React from 'react';
import { Link ,Redirect} from 'react-router-dom';
import { editTransaction, getTransactionByTransactionId } from '../../services/transactions';
import { getAccounts, getAccountNameById } from '../../services/accounts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './transactions.css';
import Toast from 'light-toast';
class EditTransaction extends React.Component {

    state = {
        accounts:[],
        onEditTransaction:false,
    }
    async componentWillMount() {
       this.setState({
           onEditTransaction:false
       })
        let accounts =await getAccounts();
        await this.setState({
            accounts:accounts,
        }) 
        let obj = await getTransactionByTransactionId(this.props.transactionClicked)
        this.props.handleTransactionType(obj.type)
        let accountName = getAccountNameById(obj.accountId)
        this.props.handleAccountName(accountName)
        this.props.handleDescription(obj.description)
        this.props.handleAmount(obj.amount)
        this.props.handleDate(new Date(obj.date))
    }
    handleEditTransaction = async () => {
        let transaction = {
            transactionType: this.props.type,
            description: this.props.description,
            amount: this.props.amount,
            date: this.props.date,
            accountName: this.props.accountName
        }
        await editTransaction(transaction, this.props.transactionClicked)
        this.props.handleTransactionType('')
        this.props.handleAccountName('')
        this.props.handleDescription('')
        this.props.handleAmount('')
        this.props.handleDate('')
        Toast.success("edited transaction successfully", 500)
        this.setState({
            onEditTransaction:true
        })
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
    componentDidMount(){

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

                <button onClick={this.handleEditTransaction} className="AddTranscButton" style={{ marginLeft: "50px" ,height:"50px" ,width:"200px"}}> Edit Transaction</button>
                {this.state.onEditTransaction ? <Redirect to="/accounts" /> : null}
            </div>
        )
    }
}

export default EditTransaction