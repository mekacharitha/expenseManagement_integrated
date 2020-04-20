import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getTransactions } from '../../services/transactions'
import TransactionDisplay from '../../containers/Transactions/transactionDisplay'
import { getAccounts } from '../../services/accounts'
import './accounts.css'
class Accounts extends React.Component {
    backgroundColors = ["#eaf7bc", "#cec3f7", "#c3f7f7", "#fcc5ea", "#f7b5b5", "#fc9099", "#9eb9f7", "#d0ffcc"]

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
                <div style={{ margin: "25px" }}>
                    <div style={{ textAlign: "left", marginLeft: "25px" }}>
                        <label style={{ fontWeight: "bold" }} >ACCOUNTS</label>
                    </div>
                    <div style={{ overflowX: "auto", display: "flex", border: "black" }} >
                        {this.state.accounts.map(obj => {
                            backgroundIndex = Math.floor(Math.random() * Math.floor(7));
                            return (<div className="AccountCard" style={{ cursor: "pointer" , backgroundColor: this.backgroundColors[backgroundIndex] }} onClick={() => { this.handleDivClicked(obj.accountName) }}>
                                {obj.accountName}
                                <b style={{ fontSize: "larger" }}> ₹ {obj.accountBalance} </b>
                            </div>)
                        })}
                        <div className="AccountCard">
                            <Link to='/accounts/addaccount' style={{ textDecoration: "none", fontSize: "50px" , color:"black"}}>+</Link>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "100px" }}>
                    <div style={{ textAlign: "left", marginLeft: "50px", marginBottom: "25px" }}>
                        <label style={{ fontWeight: "bold", fontSize: "17px", marginRight: "20px" }}> RECENT TRANSACTIONS</label>
                        <Link to="/accounts/addtransaction" className="AddTransactionButton">Add Transaction</Link>
                    </div>
                </div>
                <div style={{ marginLeft: "50px" }} >
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