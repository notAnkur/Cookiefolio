import { DELIVERY_DRIVER, DELIVERY_FINISH } from './types.js';

export const getDeliveryDrivers = () => dispatch => {
	console.log('calling action')
	fetch('https://api.cookiefolio.ankuranant.dev/delivery', {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	}).then(res => res.json())
		.then(driverData => {
      console.log(driverData)
      dispatch({
        type: DELIVERY_DRIVER,
        payload: driverData
      });
		});
}

export const finishDelivery = (deliveryPersonId, handleCardRefresh) => dispatch => {
	console.log('calling finishDelivery action')
	fetch('https://api.cookiefolio.ankuranant.dev/delivery', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({deliveryPersonId: deliveryPersonId})
	}).then(res => res.json())
		.then(deliveryData => {
      console.log(deliveryData)
      handleCardRefresh();
		});
}