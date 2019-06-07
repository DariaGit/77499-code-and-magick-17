'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var cloudColor = '#fff'; // цвет облака
var cloudShadowColor = 'rgba(0, 0, 0, 0.7)'; // цвет тени
var CLOUD_X = 100; // координата по осии Х облака
var CLOUD_Y = 10; // координата по осии Y облака
var BARGRAPH_FONT = '16px PT Mono'; // параметры шрифта для текста поздравления
var FONT_COLOR = 'rgba(0, 0, 0, 1)'; // цвет шрифта
var BARGRAPH_CONGRATULATION = ['Ура, вы победили!', 'Список результатов:'];
var BARGRAPH_HEIGHT = 150; // высота гистограммы
var BARGRAPH_WIDTH = 40; // ширина гистограммы
// var COLUMN_SPACING = BARGRAPH_WIDTH + 50; // расстояние между столбцами
var bargraphColor; // цвет столбцов гистограммы
var COLUMN_X = 120;
var COLUMN_Y = 270;

// Функция, рисующая облако
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция, которая выводит текст приветствия
var getStatisticsText = function (ctx) {
  ctx.fillStyle = FONT_COLOR;
  ctx.font = BARGRAPH_FONT;
  var textY = 40;
  for (var i = 0; i < BARGRAPH_CONGRATULATION.length; i++) {
    ctx.fillText(BARGRAPH_CONGRATULATION[i], CLOUD_X + 20, CLOUD_Y + textY);
    textY += 20;
  }
};

// Функция, которая определяет цвет столбцов гистаграммы
var getBargraphColor = function (name) {
  if (name === 'Вы') {
    bargraphColor = 'rgba(255, 0, 0, 1)';
  } else {
    bargraphColor = 'rgba(255, 0, 0, ' + Math.random() + ')';
  }
  return bargraphColor;
};

// Функция, которая рисует столбцы гистограммы
function drawBargraph(ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BARGRAPH_WIDTH, -height);
}

window.renderStatistics = function (ctx, names /* , times */) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, cloudShadowColor); // рисуем тень облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, cloudColor); // рисуем белое облако
  getStatisticsText(ctx); // выводим текст поздравления
  var color;
  for (var i = 0; i < names.length; i++) {
    color = getBargraphColor(names[i]);
    drawBargraph(ctx, COLUMN_X, COLUMN_Y, BARGRAPH_HEIGHT, color);
  }
};
