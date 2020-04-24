import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { getTransactions } from '../../services/transactions';
import TransactionDisplay from '../../containers/Transactions/transactionDisplay';
import { getAccounts } from '../../services/accounts';
import './accounts.css';
import { FaRegSmileWink } from "react-icons/fa";

class Accounts extends React.Component {
    backgroundColors = [["#f7d1ab", "#f5a85b"], ["#5bf5c4", "#abf7df"], ["#a9edf5", "#66eafa"], ["#b1a5fa", "#7c67f5"], ["#e5a5fa", "#d76efa"], ["#f5a4da", "#f069c3"]]
    state = {
        onDelete: false,
        divClicked: "",
        accounts: [],
        transactions: []
    }
    async componentWillMount() {
        let acc = await getAccounts()
        await this.setState({ accounts: acc })

        let trans = await getTransactions()
        await this.setState({ transactions: trans })

        this.setState({ onDelete: false })
    }
    handleDelete = async () => {
        this.setState({ onDelete: true })
        let acc = await getAccounts()
        await this.setState({ accounts: acc })
        let trans = await getTransactions()
        await this.setState({ transactions: trans })
        this.setState({ onDelete: false })
    }
    handleDivClicked = (name) => {
        this.props.handleDivClicked(name)
    }
    render() {
        let backgroundIndex = 0;
        return (
            <div>
                <div className="divMain">
                    <div className="divAccountLabel">
                        <label className="accountsLabel" >ACCOUNTS</label>
                    </div>
                    <div className="divAccounts">
                        {this.state.accounts.map(obj => {
                            backgroundIndex = Math.floor(Math.random() * Math.floor(5));
                            return (<div className="AccountCard" style={{ backgroundImage: "linear-gradient(" + this.backgroundColors[backgroundIndex][1] + "," + this.backgroundColors[backgroundIndex][0] + ")" }} onClick={() => { this.handleDivClicked(obj.accountName) }}>
                                <div className="smileDiv">
                                    <FaRegSmileWink />
                                </div>
                                <div className="AccountCardSub">
                                    <label className="accNameLabel" > {obj.accountName} </label>
                                    <b className="balanceLabel"> ₹ {obj.accountBalance.toLocaleString('en-IN')} </b>
                                </div>
                            </div>)
                        })}
                        <div className="AccountCard">
                            <Link to='/accounts/addaccount' className="addAccLink" >+</Link>
                        </div>
                    </div>
                </div>
                <div className="transactionDiv">
                    <div className="transactionDiv2">
                        <label className="addTransactionLabel"> RECENT TRANSACTIONS</label>
                        <Link to="/accounts/addtransaction" className="AddTransactionButton">Add Transaction</Link>
                    </div>
                </div>
                <div className="transDisplayTopDiv" >

                    {this.state.transactions.length !== 0 ? this.state.transactions.map(item => {
                        return <TransactionDisplay onDelete={this.handleDelete}>{item}</TransactionDisplay>
                    }) : <h1>NO RECENT TRANSACTIONS</h1>}
                </div>
                {this.props.accountClicked ? <Redirect to={`/accounts/specificAccountTransactions/${this.props.accountClicked}`} /> : null}
            </div>
        )
    }
}
export default Accounts;