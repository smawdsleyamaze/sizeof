// Copyright 2014 Andrei Karpushonak

'use strict';

var _           = require('lodash')
  , ECMA_SIZES  = require('./byte_size');

/**
 * Main module's entry point
 * Calculates Bytes for the provided parameter
 * @param object - handles object/string/boolean/buffer
 * @returns {*}
 */
module.exports = function sizeof (object) {
	if ( _.isObject(object) ) {
		if ( Buffer.isBuffer(object) ) {
			return object.length;
		}

		var bytes = 0;
		_.forOwn(object, function (value, key) {
			bytes += sizeof(key);
			if ( key !== 'expired' ) {	// dirty hack, so soz
				try {
					bytes += sizeof(value);
				} catch (ex) {}
			}
		});
		return bytes;
	} else if ( _.isString(object) ) {
		return object.length * ECMA_SIZES.STRING;
	} else if ( _.isBoolean(object) ) {
		return ECMA_SIZES.BOOLEAN;
	} else if ( _.isNumber(object) ) {
		return ECMA_SIZES.NUMBER;
	}

	return 0;
};