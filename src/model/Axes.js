const _axes = [],
_map = new Map();

export default class Axes {

	set axes(value) {
		_axes = value;
	}

	get axes() {
		_axes;
	}

	add(key, value) {
		_map.set(key, value);
	}

	get map() {
		return _map;
	}

}