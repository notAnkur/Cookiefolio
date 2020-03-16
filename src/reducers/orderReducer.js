import { ORDER } from '../actions/types.js';

const initialState = {
	
}

export default (state=initialState, action) => {
	switch(action.type) {
		case ORDER:
      return Object.assign({}, state, {
        newOrder: action.payload,
      });
		default:
			return state;
	}
}