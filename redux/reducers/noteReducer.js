import {INCREMENT,DECREMENT} from '../actions/noteAction'
import {combineReducers} from 'redux';
const initApp = {
    number:0 
}
const noteReducer = (state = initApp,action) =>{
    switch(action.type){
        case INCREMENT:
          
            return{
                count:state.number+1
            }
        case DECREMENT:
            let count = state.number;
            if(count>0){
                return{
                    count:state.count-1
                } 
            }
            return state
            
        default:
            return state;
    }
}



export default noteReducer; 
