import jwt from 'jsonwebtoken'
import axios from 'axios';

export const addAccount = async (accountName, accBalance) => {
    let payload = jwt.decode(JSON.parse(localStorage.getItem("token")))
   let response = await axios.post('http://localhost:8000/addAccount',{
        accountName:accountName,
        accountBalance:accBalance,
        userId:payload.userId
    })
    if(response.data.success){
        return true
    }
    return false;

}

export const getAccounts = async() => {
    
    let payload = jwt.decode(JSON.parse(localStorage.getItem('token')));
    let response = await axios.get("http://localhost:8000/accountsByUserId/"+payload.userId)
    if(response.data.success){
        return response.data.accountsData
    }
    return false;
}

export const getAccountBalance = async(accountName) => {
    
    try {
        accountName=window.location.pathname.substr(38)
        let payload = jwt.decode(JSON.parse(localStorage.getItem("token")))
        let response = await axios.get('http://localhost:8000/accountBalanceByAccountName/' + accountName +'/' +payload.userId  )
        return response.data.balance
    }
    catch (err) {
        console.log(false)
        return false
    }

}

export const getAccountNameById = async (accId) => {
   
    try {
        let payload = jwt.decode(JSON.parse(localStorage.getItem("token")))
        let response = await axios.get('http://localhost:8000/accountNameByAccountId/' + payload.userId +'/'+ accId)
        return response.data.accountName
    }
    catch (err) {
        console.log(false)
        return false
    }
}
