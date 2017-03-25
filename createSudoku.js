function getArr() {

	var arr = [];

	var dereplication = function(orgArr, tarArr, row, col) {
		var tarArr = tarArr.slice();
		var index = tarArr.indexOf(orgArr[row][col]);
		if (~index) {
			tarArr.splice(index, 1);
		}
		return tarArr;
	}.bind(null, arr);

	while (arr.length < 9) {
		arr.push([]);
		pushIndex(arr.length - 1);
	}

	function pushIndex(row) {
		var num = 30;

		while (num) {
			num--;
			for (var i = 0; i < 9; i++) {
				var randomArr = getRandomArr(row, i);
				var len = randomArr.length;

				if (!len) {
					break;
				} else {
					arr[row].push(randomArr[~~(Math.random() * len)]);
				}
			}
			if (arr[row].length < 9) {
				arr[row].length = 0;
				continue;
			}
			return;
		}
		arr.length = arr.length - 2;
	}

	function getRandomArr(row, col) {
		var num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		var len = arr.length - 1;

		if (col > 0) {
			for (var i = 0; i < col; i++) {
				num = dereplication(num, row, i);
			}
		}
		for (var i = 0; i < len; i++) {
			num = dereplication(num, i, col);
		}
		if (row % 3 !== 0) {
			if (col % 3 === 0) {
				num = dereplication(num, row - 1, col + 1);
				num = dereplication(num, row - 1, col + 2);
			}
			if (col % 3 === 1) {
				num = dereplication(num, row - 1, col + 1);
				num = dereplication(num, row - 1, col - 1);
			}
			if (col % 3 === 2) {
				num = dereplication(num, row - 1, col - 1);
				num = dereplication(num, row - 1, col - 2);
			}
		}
		if (row % 3 === 2) {
			if (col % 3 === 0) {
				num = dereplication(num, row - 2, col + 1);
				num = dereplication(num, row - 2, col + 2);
			}
			if (col % 3 === 1) {
				num = dereplication(num, row - 2, col + 1);
				num = dereplication(num, row - 2, col - 1);
			}
			if (col % 3 === 2) {
				num = dereplication(num, row - 2, col - 1);
				num = dereplication(num, row - 2, col - 2);
			}
		}
		return num;
	}
	return arr;
}
