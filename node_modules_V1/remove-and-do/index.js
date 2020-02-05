/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function removeAndDo(context, collection, thing, action) {
	var idx = context[collection].indexOf(thing);
	if (idx === -1) {
		return false;
	}
	context[collection].splice(idx, 1);
	thing[action](context);
	return true;
};
