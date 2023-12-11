const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.font = "50px Arial";

// Объявляем переменные и константы
let money = Number($("#money").html());	// Депозит игрока (?????)
let randFig; 						// Двумерный массив с рандомными фигурами
let sum = 0;						// Сумма выигрыша
let minFig = 7;						// Минимальное кол-во фигур для подсчета
let fallY = 0;						// Падение фигурок (Y-координата)
const box = 70;						// Размер ячейки
const borderDownBox = box * 5 - 5;	// Нижняя граница поля
let rendering;						// Переменная для покадровой отрисовки

// Массив с фигурами 
const thisFigures = ["circle", "square", "triangle", 
					"rhombus", "pentagon", "heart", 
					"star4", "lightning", "star5"];

// Массив с фигурами и их стоимостью
const figuresPrice = new Map([
	["circle", 1], ["square", 5], ["triangle", 10],
	["rhombus", 20], ["pentagon", 50], ["heart", 100],
	["star4", 150], ["lightning", 200], ["star5", 300]
	]);

// Массив хранящий изображение фигурок
let imageFigures = new Map([
	["circle", 0], ["square", 0], ["triangle", 0],
	["rhombus", 0], ["pentagon", 0], ["heart", 0],
	["star4", 0], ["lightning", 0], ["star5", 0]
	]);

const ground = new Image();		// Изображение поля
// Рисуем поле после загрузки изображения
ground.onload = function() {
	ctx.drawImage(ground, 0, 0, 700, 630);
	ctx.fillText("Депозит:", box, box);
	ctx.fillText(money + "$", box * 4.5, box);
	ctx.fillText("Выигрыш:", box, box * 2);
	ctx.fillText(sum + "$", box * 4.5, box * 2);
	ctx.fillStyle = "#578A34";
	ctx.fillRect(0, 151, 700, 58);
}
ground.src = "image/ground.png";	// Загружаем текстуру поля

// Загрузка изображений для каждой фигурки 
for (let figura of imageFigures.keys()) {
	const img = new Image();
	img.src = "image/figures/" + figura + ".png";
	imageFigures.set(figura, img);
}

// Функция, заполняющая массив нулями
function ziroMas() {
	return new Array(6).fill("").map(() => {
		return new Array(5).fill(0);
	});
}

// Массив, хранящий координаты фигур по оси У
let coordFigures = ziroMas();

// ==========================================================================================

// Функция покадровой отрисовки поля с фигурками 
function renderingFigures(figures) {
	ctx.fillStyle = "white";
	ctx.drawImage(ground, 0, 0, 700, 630);
	ctx.fillText("Депозит:", box, box);
	ctx.fillText(money + "$", box * 4.5, box);
	ctx.fillText("Выигрыш:", box, box * 2);
	ctx.fillText(sum + "$", box * 4.5, box * 2);
	fallY += 5;

	figures.forEach((figuresY, y) => {
		figuresY.forEach((itemX, x) => {
			// Если это новый элемент (j=0..4), то он падает вниз с задержкой к своему месту
			// ИЛИ если снизу пропадают элементы, то верхние без ожидания падают вниз
			// fallY > 70*0..4 И Текущая координата < 350-70*0..4
			if ((fallY > box * x || fallY < coordFigures[y][x]) &&
				(coordFigures[y][x] < borderDownBox - box * x)) {
				coordFigures[y][x] += 5;
			}
			ctx.drawImage(imageFigures.get(itemX),
			(2 + box + box * y), 151 + coordFigures[y][x], 60, 55);
		});
	});

	ctx.fillStyle = "#578A34";
	ctx.fillRect(0, 151, 700, 58);
	if (fallY >= borderDownBox) {
		fallY = 0;
		clearInterval(rendering);
	}
}

// Очистка поля от сыграного прокрута 
function removeOldFig(figures) {
	ctx.fillStyle = "white";
	ctx.drawImage(ground, 0, 0, 700, 630);
	ctx.fillText("Депозит:", box, box);
	ctx.fillText(money + "$", box * 4.5, box);
	ctx.fillText("Выигрыш:", box, box * 2);
	ctx.fillText(sum + "$", box * 4.5, box * 2);
	fallY += 5;

	figures.forEach((figuresY, y) => {
		figuresY.forEach((itemX, x) => {
			if (coordFigures[y][x] < 405) {
				coordFigures[y][x] += 5;
			}
			ctx.drawImage(imageFigures.get(itemX),
			(2 + box + box * y), 151 + coordFigures[y][x], 60, 55);
		});
	});

	ctx.fillStyle = "#578A34";
	ctx.fillRect(0, 556, 700, 68);
	ctx.fillRect(0, 151, 700, 58);
	if (fallY >= borderDownBox) {
		fallY = 0;
		clearInterval(rendering);
	}
}

// Создаем массив 6*5 с рандомными фигурами
function randomMixFigures() {
	return new Array(6).fill("").map(() => {
		return new Array(5).fill("").map(() => {
			return thisFigures[Math.floor(Math.random() * 9)];
		});
	});
}

// =========================================================================================

// Главная функция игры
async function game() {
	if (money < 100) {
		alert("Недостаточно средств на балансе!");
		return 0;
	} else money -= 100;

	document.getElementById("btnSpin").disabled = true;

	if (coordFigures[0][0] != 0) {
		rendering = setInterval(() => removeOldFig(randFig), 15);
		await new Promise(r => setTimeout(r, 1200));
		coordFigures = ziroMas();
	}

	randFig = randomMixFigures(); 	// Заполняем массив рандомными фигурами
	let spin = false;				// Условие для повторного прокрута

	rendering = setInterval(() => renderingFigures(randFig), 15);	// Вызов функции с интервалом 15мс
	await new Promise(r => setTimeout(r, 1200));					// Пауза на 1200мс

	// Главный цикл для прокрутки рулетки
	do {
		spin = false;
		// Массив для подсчета кол-ва фигур
		let NumFigures = new Map([
			["circle", 0], ["square", 0], ["triangle", 0],
			["rhombus", 0], ["pentagon", 0], ["heart", 0],
			["star4", 0], ["lightning", 0], ["star5", 0]
		]);

		// Подсчитываем кол-во отдельных фигур
		randFig.forEach((figuresY, y) => {
			figuresY.forEach((itemX, x) => {
				let num = NumFigures.get(itemX);
				NumFigures.set(itemX, ++num);
			});
		});

		// Если фигур больше k => считаем их стоимость в sum
		for (let figura of NumFigures.keys()) {
			if (NumFigures.get(figura) >= minFig) {
				sum += NumFigures.get(figura) * figuresPrice.get(figura);
				spin = true; // Флаг true для повторного прокрута
			}
		}

		if (spin) {
			// Подсвечиваем и удаляем фигуры которые "сыграли"
			for (let i = 0; i < 6; i ++) {
				let y = 0;
				for(let j = 0; j < 5; j++) {
					if (NumFigures.get(randFig[i][j]) >= minFig) {
						ctx.fillStyle = "rgba(255,10,38,0.5)";
						ctx.fillRect((2 + box + box * i), 146 + (box * 5 - box * y), 60, 55);
						randFig[i].splice(j, 1);
						coordFigures[i].splice(j, 1);
						j--;
					}
					y++;
				}
			}
			await new Promise(r => setTimeout(r, 1200));

			// Добавляем новые фигуры и делаем прокрут заново
			for (let i = 0; i < 6; i ++) {
				for (let j = randFig[i].length; j < 5; j++) {
					let index = Math.floor(Math.random() * 9);
					randFig[i].push(thisFigures[index]);
					coordFigures[i].push(0);
				}
			}
			rendering = setInterval(() => renderingFigures(randFig), 15);
			await new Promise(r => setTimeout(r, 1200));
		}
	} while(spin);

	money += sum;
	//$.post("script/upUserData.php", {money: money});
	$.ajax({
		url: "script/upUserData.php",
		type: "POST",
		dataType: "json",
		data: {
			money: money
		}
	});

	renderingFigures(randFig);
	sum = 0;
	document.getElementById("btnSpin").disabled = false;
}

// ===============================================================================

// Кнопка запуска рулетки (вызов главной функции игры)
let btnSpin = document.querySelector("#btnSpin");
btnSpin.addEventListener("click", function() { game() });