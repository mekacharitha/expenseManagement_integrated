import jwt from 'jsonwebtoken'
import {  localStorageGetItem } from './utils';
import axios from 'axios';
export const addAccount = async (accountName, accBalance) => {
    let payload = jwt.decode(JSON.parse(localStorage.getItem("token")))
    // let accounts = JSON.parse(localStorage.getItem('accounts'));
    // let accountIndex = accounts.findIndex(item => {
    //     return (item.accountName === accountName) && (item.userId == payload.userId)
    // })
    // if (accountIndex === -1) {
    //     let accId = JSON.parse(localStorage.getItem('accountId'))
    //     accId++
    //     let obj = {
    //         accountId: accId,
    //         accountName: accountName,
    //         accountBalance: accBalance,
    //         userId: payload.userId
    //     }
    //     accounts.push(obj)
    //     localStorage.setItem("accounts", JSON.stringify(accounts))
    //     localStorage.setItem('accountId', JSON.stringify(accId))
    //     return true
    // }
    // return false
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
    //let accounts = JSON.parse(localStorage.getItem('accounts'));
    //let payload = jwt.decode(JSON.parse(localStorage.getItem('token')));
    // let userAccounts = accounts.filter(obj => {
    //     return obj.userId === payload.userId
    // })
    // return userAccounts;let userAccounts = accounts.filter(obj => {
    //     return obj.userId === payload.userId
    // })
    // return userAccounts;

    let payload = jwt.decode(JSON.parse(localStorage.getItem('token')));
    let response = await axios.get("http://localhost:8000/accountsByUserId/"+payload.userId)
    if(response.data.success){
        return response.data.accountsData
    }
    return false;
}

export const getAccountBalance = async(accountName) => {
    // let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));
    // let accounts = JSON.parse(localStorage.getItem("accounts"));
    // let accBalance = accounts.map(obj => {
    //     if (obj.accountName == accountName && obj.userId === payload.userId)
    //         return obj.accountBalance;
    // })
    // return accBalance;

    try {
        accountName=window.location.pathname.substr(38)
        let payload = jwt.decode(JSON.parse(localStorage.getItem("token")))
        //console.log("axios", payload.userId)
        let response = await axios.get('http://localhost:8000/accountBalanceByAccountName/' + accountName +'/' +payload.userId  )
        console.log(response)
        return response.data.balance
    }
    catch (err) {
        console.log(false)
        return false
    }

}

export const getAccountNameById = async (accId) => {
    // let accounts = localStorageGetItem('accounts');
    // let payload = jwt.decode(localStorageGetItem("token"));
    // let accName = accounts.filter(obj => {
    //     return obj.accountId == accId && obj.userId == payload.userId
    // })
    // return accName[0].accountName;
    try {
        let payload = jwt.decode(JSON.parse(localStorage.getItem("token")))
       // console.log("axios", payload.userId)
        let response = await axios.get('http://localhost:8000/accountNameByAccountId/' + payload.userId +'/'+ accId)
        console.log(response.data.accountName)
        return response.data.accountName
    }
    catch (err) {
        console.log(false)
        return false
    }
}
