new Vue({
	el: '#app',
	data: {
		sudoku: [],
		select: [0, 0],
		squareArr: [],
		local: !!localStorage.sudoku,
	},
	methods: {
		backgroundChange(row, col) {
			this.sudoku[this.select[0]][this.select[1]].background = false;
			this.select = [row, col];
			this.sudoku[row][col].background = true;
		},
		changeNum(index) {
			this.sudoku[this.select[0]][this.select[1]].num = typeof index === 'number' ? index : '';
			this.sudoku.forEach((arr, row) => {
				arr.forEach((obj, col) => {
					this.sudoku[row][col].colorRed = checkArr.call(this, obj.num, row, col);
				});
			});

			function checkArr(num, row, col) {
				let sudoku = this.sudoku;
				let rowIndex = ~~(row / 3) * 3;
				let colIndex = ~~(col / 3) * 3;
				for (let i = 0; i < 9; i++) {
					if (i !== row && sudoku[i][col].num === num || i !== col && sudoku[row][i].num === num) {
						return true;
					}
				}
				for (let i = 0; i < 3; i++) {
					if (i === row % 3) continue;
					for (let j = 0; j < 3; j++) {
						if (j === col % 3) continue;
						if (sudoku[rowIndex + i][colIndex + j].num === num) {
							return true;
						}
					}
				}
				return false;
			};
		},
		load() {
			this.sudoku = JSON.parse(localStorage.sudoku);
		},
		save() {
			localStorage.sudoku = JSON.stringify(this.sudoku);
		}
	},
	beforeMount() {
		let sudokuArr = getArr().map((arr) => {
			return arr.map((num) => {
				return {
					num,
					colorRed: false,
					background: false,
				}
			})
		});
		this.sudoku = sudokuArr;
	},
})