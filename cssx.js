function cssx(cssx) {
	return function (element) {
		for (var selector in cssx)
			element.children(selector).data('cssx', cssx[selector]);
	};
}
