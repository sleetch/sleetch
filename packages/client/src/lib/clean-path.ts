export function clean_path(_path?: string) {
	if (!_path || _path.length === 0) _path = '/';
	else if (_path !== "/") {
		if (!_path.startsWith('/', 0)) _path = `/${_path}`;
		if (_path.endsWith('/')) _path = _path.slice(0, -1)
	}
	return _path
}

/*

TODO: build a global framework test suite

console.log(clean_path())
console.log(clean_path(''))
console.log(clean_path('/'))
console.log(clean_path('a'))
console.log(clean_path('/aa/'))
console.log(clean_path('aa/'))
console.log(clean_path('/aa/AD'))
console.log(clean_path('aa/AD'))
*/
