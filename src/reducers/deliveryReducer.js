import { DELIVERY_DRIVER } from '../actions/types.js';

const initialState = {
  deliveryDriver: [],
  deliveryFetchStatus: false
}

export default (state=initialState, action) => {
	switch(action.type) {
		case DELIVERY_DRIVER:
      return Object.assign({}, state, {
        deliveryDriver: action.payload,
        deliveryFetchStatus: true
      });
		default:
			return state;
	}
}