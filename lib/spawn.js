'use strict'

const typeasy = require('typeasy')
const TableStore = require('tablestore')

module.exports = function spawnObject(obj) {
	const list = []

	if (typeasy(obj) !== 'object') {
		return list
	}

	Object.getOwnPropertyNames(obj).forEach((key) => {
		const value = obj[key]
		const type = typeasy(value)

		if (['string', 'boolean', 'uint8array'].includes(type)) {
			list.push({
				[key]: value,
			})
		} else if (type === 'number') {
			if (value % 1 === 0) {
				list.push({
					[key]: TableStore.Long.fromNumber(value),
				})
			} else {
				list.push({
					[key]: value,
				})
			}
		} else if (type === 'object') {
			try {
				list.push({
					[key]: JSON.stringify(value),
				})
			} catch (err) {
				// 空
			}
		} else {
			// 空
		}
	})

	return list
}
