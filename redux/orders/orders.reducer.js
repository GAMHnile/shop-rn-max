import Order from '../../models/order.model';
import  orderTypes from './orders.types';


const initialState = {
    orders: []
};

const ordersReducer = (state=initialState, action) =>{
    switch(action.type){
        case orderTypes.ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.payload.items,
                action.payload.total,
                new Date()
                );
            return {...state, orders: state.orders.concat(newOrder)}

        default:
            return state
    }
}

export default ordersReducer;