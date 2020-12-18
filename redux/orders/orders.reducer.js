import Order from '../../models/order.model';
import  orderTypes from './orders.types';


const initialState = {
    orders: []
};

const ordersReducer = (state=initialState, action) =>{
    switch(action.type){
        case orderTypes.SET_ORDERS:
            return {orders: action.payload}
        case orderTypes.ADD_ORDER:
            const newOrder = new Order(
                action.payload.id,
                action.payload.items,
                action.payload.total,
                action.payload.date
                );
            return {...state, orders: state.orders.concat(newOrder)}

        default:
            return state
    }
}

export default ordersReducer;