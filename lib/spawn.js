'use strict'

const typeasy = require('typeasy')

module.exports = function spawnObject(obj) {
	if (typeasy(obj) !== 'object') {
		return []
	}

	const list = []

	Object.getOwnPropertyNames(obj).forEach((e) => {
		list.push({
			[e]: obj[e],
		})
	})

	return list
}
