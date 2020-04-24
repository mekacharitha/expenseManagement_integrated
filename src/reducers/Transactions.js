import {
    handleTransactionType,
    handleDescription,
    handleDate,
    handleAccountName,
    handleAmount,
    editTransaction
} from '../actions/transactionsActionConstants'

const initialState = {
    transactionType: '',
    amount: null,
    accountName: '',
    description: '',
    date: null,
    transactionClicked: null
}

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case handleTransactionType: {
            return {
                ...state,
                transactionType: action.payload
            }
        }

        case handleAmount: {
            return {
                ...state,
                amount: action.payload
            }
        }
        case handleDescription: {
            return {
                ...state,
                description: action.payload
            }
        }
        case handleDate: {
            return {
                ...state,
                date: action.payload
            }
        }
        case handleAccountName: {
            return {
                ...state,
                accountName: action.payload
            }
        }
        case editTransaction: {
            return {
                ...state,
                transactionClicked: action.payload
            }
        }
        default: return state;
    }
}

export default transactionsReducer;