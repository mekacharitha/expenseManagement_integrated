import React from 'react'
import { deleteTransaction } from '../../services/transactions'
import { Link, Redirect } from 'react-router-dom'
import { FiEdit } from "react-icons/fi"
import { MdDelete } from "react-icons/md"
import './transactions.css'
import { getAccountNameById } from '../../services/accounts'
import Toast from 'light-toast';
import moment from 'moment';
class TransactionDisplay extends React.Component {
    state = {
        account: "",
        delState: false
    }
    async componentWillMount() {
        let accName = await getAccountNameById(this.props.children.accountId);
        await this.setState({
            account: accName,
        })
        this.setState({
            delState: false,
        })
    }

    async componentDidUpdate(prevProps) {
        //console.log(prevProps , this.props);
        if (prevProps.children.accountId !== this.props.children.accountId) {
            let accName = await getAccountNameById(this.props.children.accountId);
            await this.setState({
                account: accName,
            })
        }
    }

    handleDelete = async () => {

        await deleteTransaction(this.props.children.id)
        await this.props.onDelete()
        this.setState({
            delState: true,
        })
       
        Toast.success("transaction deleted", 500)
    }
    render() {
        return (
            <div className="transactionCard" >
                <div className="TransactionItem1"> {this.props.children.type}</div>
                <div className="TransactionItem2"> {this.props.children.description}</div>
                <div className="TransactionItem3"> {moment(this.props.children.date).format('DD-MM-YYYY')}</div>
                <div className="TransactionItem4"> ₹ {this.props.children.amount.toLocaleString('en-IN')}</div>
                <div className="TransactionItem5">{this.state.account}</div>
                <MdDelete onClick={async () => await this.handleDelete(this.props.children.id)} className="deleteIcon" />
                <Link className="editIcon" onClick={() => { this.props.onEditTransaction(this.props.children.id) }} to={`/accounts/edittransaction/${this.props.children.id}`}><FiEdit style={{ color: "black" }} /></Link>
                {this.state.delState ? <Redirect to="/accounts" /> : null}
            </div>
        )
    }
}
export default TransactionDisplay ;