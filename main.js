new Vue({
	el: '#app',
	data: {
		sudoku: [],
		select: [0, 0],
		squareArr: [],
		local: !!localStorage.sudoku,
	},
	methods: {
		backgroundChange: function(row, col) {
			this.sudoku[this.select[0]][this.select[1]].background = false;
			this.select = [row, col];
			this.sudoku[row][col].background = true;
		},
		changeNum: function(index) {
			this.sudoku[this.select[0]][this.select[1]].num = typeof index === 'number' ? index : '';
			this.sudoku.forEach(function(arr, row) {
				arr.forEach(function(obj, col) {
					this.sudoku[row][col].colorRed = checkArr.call(this, obj.num, row, col);
				});
			});

			function checkArr(num, row, col) {
				var sudoku = this.sudoku;
				var rowIndex = ~~(row / 3) * 3;
				var colIndex = ~~(col / 3) * 3;
				for (var i = 0; i < 9; i++) {
					if (i !== row && sudoku[i][col].num === num || i !== col && sudoku[row][i].num === num) {
						return true;
					}
				}
				for (var i = 0; i < 3; i++) {
					if (i === row % 3) continue;
					for (var j = 0; j < 3; j++) {
						if (j === col % 3) continue;
						if (sudoku[rowIndex + i][colIndex + j].num === num) {
							return true;
						}
					}
				}
				return false;
			};
		},
		load: function() {
			this.sudoku = JSON.parse(localStorage.sudoku);
		},
		save: function() {
			localStorage.sudoku = JSON.stringify(this.sudoku);
		}
	},
	beforeMount: function() {
		var sudokuArr = getArr().map(function(arr) {
			return arr.map(function(num) {
				return {
					num: num,
					colorRed: false,
					background: false,
				}
			})
		});
		this.sudoku = sudokuArr;
	},
})