new Vue({
	el: '#app',
	data: {
		sudoku: [],
		tips: [],
		select: [0, 0],
		squareArr: [],
		local: !localStorage.sudoku,
		wrong: 0,
		difficulty: 15,
	},
	methods: {
		backgroundChange: function(row, col) {
			this.sudoku[this.select[0]][this.select[1]].background = false;
			this.select = [row, col];
			this.sudoku[row][col].background = true;
		},
		changeNum: function(index, e) {
			e.target.classList.add('down');
			var self = this;
			this.wrong = 0;
			this.sudoku[this.select[0]][this.select[1]].tips = false;
			this.sudoku[this.select[0]][this.select[1]].num = typeof index === 'number' ? index : '';
			this.sudoku.forEach(function(arr, row) {
				arr.forEach(function(obj, col) {
					var res = checkArr.call(self, obj.num, row, col);
					self.sudoku[row][col].colorRed = res;
					self.wrong += res;
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
		load: function(e) {
			e.target.classList.add('down');
			var self = this;
			setTimeout(function() {
				e.target.classList.remove('down');
				var res = confirm('→_→ 确定重开之前的游戏吗？');
				if (res) {
					self.sudoku = JSON.parse(localStorage.sudoku);
					self.difficulty = Number(localStorage.difficulty);
				}
			})
		},
		save: function(e) {
			e.target.classList.add('down');
			localStorage.sudoku = JSON.stringify(this.sudoku);
			localStorage.difficulty = this.difficulty;
		},
		check: function(e) {
			var all = 0;
			var res = false;
			var self = this;
			e.target.classList.add('down');
			this.sudoku.forEach(function(arr) {
				arr.forEach(function(obj) {
					all += !!obj.num;
				})
			});
			setTimeout(function() {
				e.target.classList.remove('down');
				if (self.wrong === 0 && all === 81) {
					res = confirm('(^_^)∠※ 恭喜过关~开始新一局游戏吗？');
				} else {
					alert('╮(╯_╰)╭ 你还没过关呢');
				}
				if (res) {
					if (self.difficulty < 60) {
						self.difficulty += 3;
						localStorage.difficulty = self.difficulty;
					}
					self.newGame();
				}
			})
		},
		getTips: function(e) {
			e.target.classList.add('down');
			var index = this.sudoku[this.select[0]][this.select[1]];
			if (!index.num) {
				index.num = this.tips[this.select[0]][this.select[1]];
				index.tips = true;
			}
		},
		removeClass: function(e) {
			e.target.classList.remove('down');
		},
		newGame: function() {
			var clean = [],
				num,
				row,
				col,
				sudokuArr = getArr();
			this.difficulty = localStorage.difficulty ? Number(localStorage.difficulty) : 15;
			this.tips = sudokuArr.slice();
			this.sudoku = sudokuArr.map(function(arr) {
				return arr.map(function(num) {
					return {
						num: num,
						colorRed: false,
						background: false,
						tops: false,
					}
				})
			});
			while (clean.length !== this.difficulty) {
				num = ~~(Math.random() * 81);
				if (!~clean.indexOf(num)) {
					clean.push(num);
					row = ~~(num / 9);
					col = num - row * 9;
					this.sudoku[row][col].num = '';
				}
			}
		}
	},
	beforeMount: function() {
		this.newGame();
	},
})