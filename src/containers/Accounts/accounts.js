import {
    divClicked,
    onDivClick,
} from '../../actions/accountsActionConstants';
import Accounts from '../../components/Accounts/accounts'
import { connect } from 'react-redux'
const mapStateToProps = (state) =>
    ({
        accountClicked: state.Accounts.accountClicked,
        divClicked: false,
        redirect: state.Accounts.redirect,
        accounts: state.Accounts.accounts
    })
const mapDispatchToProps = (dispatch) => {
    return {
        handleDivClicked: (value) =>
            dispatch({
                type: divClicked,
                payload: value
            }),

        onDivClicked: (value) =>
            dispatch({
                type: onDivClick,
                payload: value
            }),

        // handleAccounts : (value)=>
        //     dispatch({
        //         type:"ACCOUNTS",
        //         payload:value
        //     })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Accounts)