const _buttons = [],
_map = new Map();

export default class Buttons {

	set buttons(value) {
		_buttons = value;
	}

	get buttons() {
		return _buttons;
	}

	add(key, value) {
		_map.set(key, value);
	}

	get map() {
		return _map;
	}
}