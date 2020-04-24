import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { getTransactions } from '../../services/transactions';
import TransactionDisplay from '../../containers/Transactions/transactionDisplay';
import { getAccounts } from '../../services/accounts';
import './accounts.css';
import { FaRegSmileWink } from "react-icons/fa";

class Accounts extends React.Component {
    backgroundIndex = -1;
    backgroundColors = [["#adf1f7", "#5cebf7"],
    ["#f7bcbc", "#f75757"],
    ["#d8bcf7", "#9236f7"],
    ["#f7abe3", "#f046c3"],
    ["#f29dae", "#f04668"],
    ["#a7e1f2", "#5ad0f2"]]
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
        console.log(this.backgroundIndex);
        return (
            <div>
                <div className="divMain">
                    <div className="divAccountLabel">
                        <label className="accountsLabel" >ACCOUNTS</label>
                    </div>
                    <div className="divAccounts">
                        {this.state.accounts.map(obj => {
                            let display = (++this.backgroundIndex) % 5;
                            console.log(display);
                            return (<div className="AccountCard" style={{ background: "linear-gradient(" + this.backgroundColors[display][0] + "," + this.backgroundColors[display][1] + ")" }} onClick={() => { this.handleDivClicked(obj.accountName) }}>
                                <div className="smileDiv">
                                    <FaRegSmileWink />
                                </div>
                                <div className="AccountCardSub">
                                    <label className="accNameLabel" > {obj.accountName} </label>
                                    <b className="balanceLabel"> ₹ {obj.accountBalance.toLocaleString('en-IN')} </b>
                                </div>
                            </div>)
                        })
                        }
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