import { createStore } from "redux";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");


let initialstate ={
    UserLogin :null ,
    LogUserFriend : null ,
    message: []
}


const reducerBook = (state = initialstate, action) => 
{
  if(action.type == "addusers"){
        initialstate.LogUserFriend =action.payload

  }
  if(action.type == "UserLogin"){
      initialstate.UserLogin =(action.payload)

}
if(action.type == "Message"){
    initialstate.message =(action.payload)

}
  
      return initialstate ;
}

socket.on("receive_message", (data) => {

    
    console.log("inside reducer " ,data)

});




const store=createStore(reducerBook);
export default store;
