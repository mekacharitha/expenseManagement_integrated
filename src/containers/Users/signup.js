import Signup from '../../components/Users/signup'
import {connect} from 'react-redux';
import {userNameChange,
    passwordChange} from '../../actions/userActionConstants'
const mapStateToProps = (state) => ({
    userName: state.Users.userName,
    password: state.Users.password,
    userId: state.Users.userId,
})

const mapDispatchToProps = (dispatch) => {
    return {
        userNameChange: (value) =>
            dispatch({
                type: userNameChange,
                payload: value
            }),


        passwordChange: (value) =>
            dispatch({
                type: passwordChange,
                payload: value,
            })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);