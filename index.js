var SPECIFICITY = require('specificity');
function cssx(cssx) {
	return function (element) {
		var ruleelement =
			cssx.map(function (rule) {
				return {
					rule: rule,
					element: element.find(rule.selector)
				};
			});
		var elementrule = {};
		var id = 0;
		for (var i in ruleelement)
			ruleelement[i].element.forEach(function (element, j) {
				if (!('$id' in element))
					elementrule[element.$id = id++] = {
						element: element,
						rule: []
					};
				elementrule[element.$id].rule.push(ruleelement[i].rule);
			});
		for (var id in elementrule) {
			var rule = elementrule[id].rule;
			rule.sort(function (r, s) {
				return SPECIFICITY.compare(r.selector, s.selector);
			});
			var style = rule.map(function (rule) { return rule.style; });
			var style = extend.apply({}, style);
			elementrule[id].style = style;
		}
		return elementrule;
	};
	function extend() {
		for (var i in arguments) {
			var argument = arguments[i];
			for (var j in argument)
				this[j] = argument[j];
		}
		return this;
	}
}
cssx.parse = require('./parse.js');
module.exports = cssx;
