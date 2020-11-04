import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk'; 

const middlewares = []


const store = createStore(rootReducer,
    //composeWithDevTools()
    applyMiddleware(Thunk)
     );

export default store;