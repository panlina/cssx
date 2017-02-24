cssx.parse = function (text) {
	var sheet = [];
	for (var i = 0; ;) {
		parseSpace();
		if (i >= text.length)
			break;
		var rule = {};
		rule.selector = parseSelector();
		rule.style = parseStyle();
		sheet.push(rule);
	}
	return sheet;
	function parseSelector() {
		var i0 = i;
		while (text[i] != '{') i++;
		return text.substr(i0, i - i0);
	}
	function parseStyle() {
		var i0 = i;
		var depth = 0;
		i++;
		while (text[i] != '}' || depth) {
			if (text[i] == '{')
				depth++;
			if (text[i] == '}')
				depth--;
			i++;
		}
		i++;
		var style = text.substr(i0, i - i0);
		return JSON.parse(style);
	}
	function parseSpace() {
		for (; i < text.length; i++) {
			var c = text[i];
			if (!isSpace(c))
				break;
		}
	}
	function isSpace(c) {
		return c == ' ' || c == '\t' || c == '\n';
	}
};
