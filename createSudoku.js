function getArr() {

	//创建数组，也就是最后的9x9数独
	let arr = [];

	//去重参数，参数依次为：数独数组，排重数组，所在行，所在列
	let dereplication = function(orgArr, tarArr, row, col) {
		//尽量不改变原数组，其实可以省略，我矫情了，省略的话不必return
		var tarArr = tarArr.slice();
		let index = tarArr.indexOf(orgArr[row][col]);
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
		//可以尝试的次数，超过就回退，其实我也不知道多少为之最好，纯粹尝试之后感觉这个挺好，有知道的同学告诉我一下，并告诉我为什么，谢谢
		let num = 30;

		//这个循环就是不断尝试的过程了
		while (num) {
			num--;
			for (let i = 0; i < 9; i++) {
				//得到数独中某个格子可以选择的随机数
				let randomArr = getRandomArr(row, i);
				let len = randomArr.length;

				if (!len) {
					//如果数组长度为0，意味着此处无可用的数字，回退。
					break;
				} else {
					//有可取的话随机选一个填入该格子
					arr[row].push(randomArr[~~(Math.random() * len)]);
				}
			}
			if (arr[row].length < 9) {
				arr[row].length = 0;
				continue;
			}
			return;
		}
		//回退
		arr.length = arr.length - 2;
	}

	//获取排重后的随机数组，每项都从返回的数组中随机选取一项。
	function getRandomArr(row, col) {
		//原始1-9的数组
		let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		let len = arr.length - 1;

		//行的排重
		if (col > 0) {
			for (let i = 0; i < col; i++) {
				num = dereplication(num, row, i);
			}
		}
		//列的排重
		for (let i = 0; i < len; i++) {
			num = dereplication(num, i, col);
		}
		//当该行不是3的倍数时执行，包含：1，2，4，5，7，8行
		if (row % 3 !== 0) {
			//当列是3的倍数时执行，包含0，3，6列
			if (col % 3 === 0) {
				//去重上一行的col+1,col+2列，如此时是row=4,col=0的情况，去重row=3，col=1与col=2列的数字
				num = dereplication(num, row - 1, col + 1);
				num = dereplication(num, row - 1, col + 2);
			}
			//当列是除3余1时执行，包含1，4，7列
			if (col % 3 === 1) {
				num = dereplication(num, row - 1, col + 1);
				num = dereplication(num, row - 1, col - 1);
			}
			//当列是除3余2时执行，包含2，5，8列
			if (col % 3 === 2) {
				num = dereplication(num, row - 1, col - 1);
				num = dereplication(num, row - 1, col - 2);
			}
		}
		//当该行是除3余2的情况，包含2，5，8行
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
