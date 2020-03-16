import { ORDER } from './types.js';

export const order = (orderData) => dispatch => {
	console.log('calling action')
	fetch('http://localhost:8006/order', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(orderData)
	}).then(res => res.json())
		.then(orderData => {
      console.log(orderData)
      dispatch({
        type: ORDER,
        payload: orderData
      });
		});
}