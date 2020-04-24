import {
    userNameChange,
    passwordChange,
    onSignin,
    removeToken
} from '../actions/userActionConstants'
const initialState = {
    userName: "",
    password: "",
    userId: "",
    token: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userNameChange: {
            return {
                ...state,
                userName: action.payload
            }
        }

        case passwordChange: {
            return {
                ...state,
                password: action.payload
            }
        }

        case onSignin: {
            return {
                ...state,
                token: action.payload.token,
            }
        }
        case removeToken: {
            return {
                ...state,
                token: "",
            }
        }

        default: return state;
    }
}

export default userReducer;