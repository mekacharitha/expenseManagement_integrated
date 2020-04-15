import React from 'react'
import { deleteTransaction, getTransactionByAccountName } from '../../services/transactions'
import { getAccountBalance } from '../../services/accounts'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { getAccountNameById } from '../../services/accounts';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import './transactions.css'
import moment from 'moment'
import Toast from 'light-toast'
class SpecificAccountTransaction extends React.Component {
    state={
        accountBalance:null,
        transaction:[],
        accountName:''
    }
    handleDelete = async (transactionId) => {
        deleteTransaction(transactionId)
        this.setState({})
        Toast.success("transaction deleted successfully", 500)
    }
   async componentWillMount(){
       
        let accBalance=await getAccountBalance(this.props.accountClicked)
        await this.setState({accountBalance:accBalance})
        let trans=await getTransactionByAccountName(this.props.accountClicked)
        await this.setState({transaction:trans})
 
    }
    render() {
        return (
            <div>
                <div style={{ textAlign: "left" }}>
                    <Link onClick={() => { this.props.handleDivClicked(null) }} to="/accounts"><IoMdArrowRoundBack style={{ fontSize: "50px", color: "black" }} /></Link>
                </div>
                <div className="AccountCard">
                    {window.location.pathname.substr(38)}
                    <b style={{ fontSize: "larger" }}> ₹ {this.state.accountBalance} </b>
                </div>
                <div style={{ marginLeft: "50px", marginTop: "10px", marginRight: "1200px", display: "flex", flexDirection: "column" }}>
                    <Link to={`/accounts/addtransaction/${this.props.accountClicked}`} className="AddTransactionButton">Add Transaction</Link>
                </div>
                {this.state.transaction.length !== 0 ? this.state.transaction.map(obj => {
                    return <div style={{ height: "50px", width: "75vw", justifyContent: "space-around", display: "flex", border: "1px solid", fontSize: "20px", margin: "10px", padding: "20px" }}>
                        <div className="TransactionItem">   {obj.type}</div>
                        <div className="TransactionItem"> {obj.description}</div>
                        <div className="TransactionItem">{moment(obj.date).format('DD-MM-YYYY')}</div>
                        <div className="TransactionItem"> {obj.amount}</div>
                        {/* <div className="TransactionItem">{getAccountNameById(obj.accountId)}</div> */}
                        <MdDelete onClick={() => this.handleDelete(obj.id)} style={{cursor:"pointer"}}/>
                        <Link onClick={() => { this.props.onEditTransaction(obj.id) }} to={`/accounts/edittransaction/${obj.transactionId}`}><FiEdit style={{ color: "black" }} /></Link>
                    </div>
                }) : <h1>No Recent transactions</h1>}
            </div>
        )
    }
}
export default SpecificAccountTransaction;