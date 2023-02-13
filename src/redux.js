import { createStore } from "redux";



let Book = 20



let buyBook =()=>{
     return { type:"buy"}
}
let reducer= (state=Book, action)=>{


if( action.type ==='buy'){
   

      return  state =state -1 ;
}



// {
//       ...state,
//         n:state.n-1
  
//       }



return state ;


} ;



let store = createStore(reducer)


export default store ;















