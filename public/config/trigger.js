// Event trigger settings - used in both the react app (renderer) and the electron app (main)
// teensyduino
const vendorId = '16c0'
const productId = ''

// brainvision - will be used if product Id (line 4) or process.env.EVENT_MARKER_PRODUCT_ID are not set
// commName can be changed with environment variable process.env.EVENT_MARKER_COM_NAME
const comName = 'COM3'

// NOTE - these event codes must match what is in public/config/trigger.js
const eventCodes = {
	display: 1,
	response: 2,
	feedback: 3,
	fixation: 5,
	non_fixation: 6,
	open_task: 11
}

// this is module.exports isntead of just exports as it is also imported into the electron app
module.exports = {
	vendorId,
	productId,
	eventCodes,
	comName
}
