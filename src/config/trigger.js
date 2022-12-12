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
	eventCodes
}
