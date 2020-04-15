import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Accounts from '../containers/Accounts/accounts';
import AddAccounts from '../containers/Accounts/addAccount';
import AddTransaction from '../containers/Transactions/addTransaction';
import SpecificAccount from '../containers/Transactions/specificAccountTransaction';
import { connect } from 'react-redux';
import { localStorageGetItem } from '../services/utils';
import jwt from "jsonwebtoken";
import { MdPersonOutline } from "react-icons/md";
import EditTransaction from '../containers/Transactions/editTransaction'
import Toast from 'light-toast'
class Dashboard extends Component {
    username;
    componentWillMount() {
        let payload = jwt.decode(localStorageGetItem("token"));
        this.username = payload.userName;
    }
    handleLogout = () => {
        this.props.removeToken();
        localStorage.removeItem("token")
        Toast.success("logout successful", 500)
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', height: "65px", textAlign: "center", paddingTop: "20px", borderBottom: "2px solid", borderBottomColor: "#616161", justifyContent: "space-between" }}>
                    <div style={{ textAlign: "left", marginLeft: "30px", width: "200px" }}>
                        <label style={{ fontSize: "20px" }}>EXPENSE TRACKER</label>
                    </div>
                    <div style={{ textAlign: "right", height: "35px", width: "200px", right: "20px", display: "flex" }}>
                        <div style={{ marginRight: "20px", padding: "5px" }}><label style={{ fontSize: "20px" }}>Hi {this.username}</label></div>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="content-container">
                    <Switch>
                        <Route exact path={`${this.props.match.path}/addaccount`}><AddAccounts /></Route>
                        <Route path={`${this.props.match.path}/addtransaction`}>  <AddTransaction /> </Route>
                        <Route path={`${this.props.match.path}/edittransaction`}><EditTransaction /> </Route>
                        <Route path={`${this.props.match.path}/specificAccountTransactions`}><SpecificAccount /> </Route>
                        <Route path={`${this.props.match.path}`} exact><Accounts /></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Users.token,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeToken: (value) =>
            dispatch({
                type: "REMOVE_TOKEN",
                payload: value
            }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);