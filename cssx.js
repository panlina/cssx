function cssx(cssx) {
	return function (element) {
		for (var i in cssx) {
			var rule = cssx[i];
			element.children(rule.selector).data('cssx', rule.style);
		}
	};
}
