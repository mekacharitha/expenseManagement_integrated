
import axios from 'axios';
import { localStorageSetItem} from './utils';

export const createUser = async (user) => {

    // const users = localStorageGetItem('users');

    // if (!users) {
    //     localStorageSetItem('users', []);
    // }

    // let userIndex = users.findIndex(item => {
    //     return item.userName === user.userName
    // })
    // if (userIndex !== -1) {
    //     return false
    // }
    // users.push(user);

    // localStorageSetItem('users', users);
    // localStorageSetItem("userId", user.userId)
    let response = await axios.post('http://localhost:8000/signup',{
        userName:user.userName,
        password:user.password
    })
   
    if(response.data.success){
        return true
    }
    return false;
  
}


export const verifyUser = async (user) => {

    // const users = localStorageGetItem('users');
    // let userIndex = users.findIndex(item => {
    //     return item.userName === user.userName && item.password === user.password
    // })
    // if (userIndex !== -1) {
    //     let token = jwt.sign({ userName: user.userName, userId: users[userIndex].userId }, "xyz")
    //     localStorageSetItem("token", token)
    //     return token
    // }
    // return false
    let response = await axios.post('http://localhost:8000/signin',{
        userName:user.userName,
        password:user.password
    })
    if(response.data.success){
        localStorageSetItem("token" , response.data.token)
        return response.data.token
    }
    return false

}