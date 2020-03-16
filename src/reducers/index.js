import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import deliveryReducer from './deliveryReducer';


export default combineReducers({
  order: orderReducer,
  delivery: deliveryReducer
})