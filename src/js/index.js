	'use strict'
	var diffculty = 1;
	var timer = null;
	//界面绘制
	var ctx = document.getElementById('tanchishe').getContext('2d');
	// 定义配置
	var snake = {
		snakelength: 3,
		isalive: true,
		head_position: [17, 17],
		direction: 'right',
		body_position: [
			[15, 17],
			[16, 17]
		]
	}
	// 初始化
	var play_block = [];
	for (let j = 5; j < 30; j++) {
		play_block[j] = []
		for (let k = 5; k < 30; k++) {
			play_block[j][k] = 0;
		}
	}
	var config = {
		0: 'nonthing',
		1: 'head',
		2: 'body',
		3: 'border',
		4: 'food'
	}
	for (let i = 5; i < 30; i++) {
		play_block[5][i] = 3;
		play_block[i][5] = 3;
		play_block[29][i] = 3;
		play_block[i][29] = 3
	}

	function gamestart() {
		try {
			play_block[snake.head_position[0]][snake.head_position[1]] = 1;
			for (let i in snake.body_position) {
				play_block[snake.body_position[i][0]][snake.body_position[i][1]] = 2
			}
			drawborder()
			drawhead()
			initdrawbody()
			createfood()
			drawfood()
		} catch (e) {
			alert('你死了')
			ctx.fillStyle = '#F1EDED'
			ctx.fillRect(0, 0, 700, 700)
		}
	}

	function drawborder() {
		for (let i = 5; i < 30; i++) {
			for (let j = 5; j < 30; j++) {
				if (play_block[i][j] == 3) {
					ctx.fillStyle = 'black'
					ctx.fillRect(i * 20, j * 20, 20, 20)
				}
			}
		}
	}
	var color = 'rgb(' + Math.floor(255 - 255 * Math.random()) + ',' + Math.floor(255 - 255 * Math.random()) + ',' + Math.floor(
		255 - 255 * Math.random()) + ')';

	function drawhead() {
		ctx.fillStyle = '#1B6D85';
		for (let i = 5; i < 30; i++) {
			for (let j = 5; j < 30; j++) {
				if (play_block[i][j] == 1)
					ctx.fillRect(i * 20, j * 20, 20, 20);
			}
		}
	}

	function initdrawbody() {
		ctx.fillStyle = 'rgb(' + Math.floor(255 - 255 * Math.random()) + ',' + Math.floor(255 - 255 * Math.random()) + ',' +
			Math.floor(255 - 255 * Math.random()) + ')';
		for (let i = 5; i < 30; i++) {
			for (let j = 5; j < 30; j++) {
				if (play_block[i][j] == 2)
					ctx.fillRect(i * 20, j * 20, 20, 20);
			}
		}
	}

	function drawfood() {
		ctx.fillStyle = "#FF0000"
		for (let i = 5; i < 30; i++) {
			for (let j = 5; j < 30; j++) {
				if (play_block[i][j] == 4)
					ctx.fillRect(i * 20, j * 20, 10, 10);
			}
		}
	}
	// 移动的逻辑
	window.addEventListener('keyup', function () {
		var keys = window.event.keyCode;
		startmove(keys);
	}, false);

	function startmove(keys) {
		function tempup() {
			let temp = snake.head_position;
			move_up(temp);
			drawhead();
			initdrawbody();
		}

		function tempdown() {
			let temp = snake.head_position;
			move_down(temp);
			drawhead();
			initdrawbody();
		}

		function templeft() {
			let temp = snake.head_position;
			move_left(temp);
			drawhead();
			initdrawbody();
		}

		function tempright() {
			let temp = snake.head_position;
			move_right(temp);
			drawhead();
			initdrawbody();
		}
		switch (keys) {
			//上 
			case 38:
				if (snake.direction == 'down')
					return;
				snake.direction = 'up'
				clearInterval(timer)
				break;
				// 下
			case 40:
				if (snake.direction == 'up')
					return;
				snake.direction = 'down'
				clearInterval(timer)
				break;
				// 左
			case 37:
				if (snake.direction == 'right')
					return;
				snake.direction = 'left'
				clearInterval(timer)
				break;
				// 右
			case 39:
				if (snake.direction == 'left')
					return;
				snake.direction = 'right'
				clearInterval(timer)
				break;
			default:
				return;
		}
		switch (snake.direction) {
			case ('up'):
				timer = setInterval(function () {
					tempup()
				}, 300 / diffculty, window)
				break;
			case ('down'):
				timer = setInterval(function () {
					tempdown()
				}, 300 / diffculty, window)
				break;
			case ('left'):
				clearInterval(timer)
				timer = setInterval(function () {
					templeft()
				}, 300 / diffculty, window)
				break;
			case ('right'):
				timer = setInterval(function () {
					tempright()
				}, 300 / diffculty, window)
				break;
			default:
				return;
		}
	}
	// 移动
	function move_up(temp) {
		isalive(temp)
		snake.direction = 'up';
		snake.body_position.push([temp[0], temp[1]]);
		play_block[snake.head_position[0]][snake.head_position[1]] = 2;
		snake.head_position[1] -= 1;
		if (play_block[snake.head_position[0]][snake.head_position[1]] != 4) {
			let a = snake.body_position.shift()
			play_block[a[0]][a[1]] = 0;
			ctx.fillStyle = '#F1EDED'
			ctx.fillRect(a[0] * 20, a[1] * 20, 20, 20);
			if (play_block[snake.head_position[0]][snake.head_position[1]] == 2) {
				alert('你把自己吃了');
				location.reload();
			}
		} else {
			createfood()
			drawfood()
		}

		play_block[snake.head_position[0]][snake.head_position[1]] = 1;
	}

	function move_down(temp) {
		isalive(temp)
		snake.direction = 'down';
		snake.body_position.push([temp[0], temp[1]]);
		play_block[snake.head_position[0]][snake.head_position[1]] = 2;
		snake.head_position[1] += 1;
		if (play_block[snake.head_position[0]][snake.head_position[1]] != 4) {
			let a = snake.body_position.shift()
			play_block[a[0]][a[1]] = 0;
			ctx.fillStyle = '#F1EDED'
			ctx.fillRect(a[0] * 20, a[1] * 20, 20, 20);
			if (play_block[snake.head_position[0]][snake.head_position[1]] == 2) {
				alert('你把自己吃了');
				location.reload();
			}
		} else {
			createfood()
			drawfood()
		}
		play_block[snake.head_position[0]][snake.head_position[1]] = 1;
	}

	function move_left(temp) {
		isalive(temp)
		snake.direction = 'left';
		snake.body_position.push([temp[0], temp[1]]);
		play_block[snake.head_position[0]][snake.head_position[1]] = 2;
		snake.head_position[0] -= 1;
		if (play_block[snake.head_position[0]][snake.head_position[1]] != 4) {
			let a = snake.body_position.shift()
			play_block[a[0]][a[1]] = 0;
			ctx.fillStyle = '#F1EDED'
			ctx.fillRect(a[0] * 20, a[1] * 20, 20, 20);
			if (play_block[snake.head_position[0]][snake.head_position[1]] == 2) {
				alert('你把自己吃了');
				location.reload();
			}
		} else {
			createfood()
			drawfood()
		}
		play_block[snake.head_position[0]][snake.head_position[1]] = 1;
	}

	function move_right(temp) {
		isalive(temp)
		snake.direction = 'right';
		snake.body_position.push([temp[0], temp[1]]);
		play_block[temp[0]][temp[1]] = 2;
		snake.head_position[0] += 1;
		if (play_block[snake.head_position[0]][snake.head_position[1]] != 4) {
			let a = snake.body_position.shift()
			play_block[a[0]][a[1]] = 0;
			ctx.fillStyle = '#F1EDED'
			ctx.fillRect(a[0] * 20, a[1] * 20, 20, 20);
			if (play_block[snake.head_position[0]][snake.head_position[1]] == 2) {
				alert('你把自己吃了');
				location.reload();
			}
		} else {
			createfood()
			drawfood()
		}
		play_block[snake.head_position[0]][snake.head_position[1]] = 1;
	}
	// 食物

	function createfood() {
		let x = Math.floor(6 + 20 * Math.random())
		let y = Math.floor(6 + 20 * Math.random())
		play_block[x][y] = 4;
	}
	// 控制
	function isalive(temp) {
		if (temp[0] < 7 || temp[0] > 27 || temp[1] < 7 || temp[1] > 27) {
			alert('你死了')
			location.reload();
		}
	}
	document.getElementById('sele').onclick = function () {
		let myselect = document.getElementById("diffculty");
		let myindex = document.getElementById("diffculty").selectedIndex;
		diffculty = myselect.options[myindex].value
	}