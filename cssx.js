function cssx(cssx) {
	return function (element) {
		var ruleelement =
			cssx.map(function (rule) {
				return {
					rule: rule,
					element: element.children(rule.selector)
				};
			});
		var elementrule = {};
		var id = 0;
		for (var i in ruleelement)
			ruleelement[i].element.each(function (j, element) {
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
			style.unshift({});
			var style = $.extend.apply(undefined, style);
			elementrule[id].style = style;
		}
		return elementrule;
	};
}
