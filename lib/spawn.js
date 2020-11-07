'use strict'

const typeasy = require('typeasy')
const Int64buf = require('int64-buffer')

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
					[key]: new Int64buf.Int64LE(value),
				})
			} else {
				list.push({
					[key]: value,
				})
			}
		} else if (['object', 'array'].includes(type)) {
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
