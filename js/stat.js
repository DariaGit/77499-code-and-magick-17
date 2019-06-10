'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';
var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP_SIZE = 10;

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_X = CLOUD_X + GAP_SIZE;
var SHADOW_Y = CLOUD_Y + GAP_SIZE;

var STATISTICS_TEXT_COLOR = '#283442';
var STATISTICS_TEXT_FONT = '16px PT Mono';
var STATISTICS_FONT_HEIGHT = 16;

var TEXT_CONGRATULATIONS = ['Ура, вы победили!', 'Список результатов:'];
var TEXT_X_OFFSET = 20;
var TEXT_X_BEGIN = CLOUD_X + TEXT_X_OFFSET;
var TEXT_Y_OFFSET = 30;
var TEXT_Y_BEGIN = CLOUD_Y + TEXT_Y_OFFSET;
var TEXT_Y_DISTANCE = 20;

var COLUMN_DISTANCE = 50;
var COLUMN_X_BEGIN = 120;
var COLUMN_Y_BEGIN = 250;
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_WINNER_TEXT = 'Вы';
var COLUMN_WINNER_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderStatisticsText = function (ctx) {
  ctx.fillStyle = STATISTICS_TEXT_COLOR;
  ctx.font = STATISTICS_TEXT_FONT;
  var y = TEXT_Y_BEGIN;
  for (var i = 0; i < TEXT_CONGRATULATIONS.length; i++) {
    ctx.fillText(TEXT_CONGRATULATIONS[i], TEXT_X_BEGIN, y);
    y += TEXT_Y_DISTANCE;
  }
};

var renderBarColor = function (name) {
  return name === COLUMN_WINNER_TEXT
    ? COLUMN_WINNER_COLOR
    : 'rgba(0, 100, 0, ' + Math.random() + ')';
};

var renderBar = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, COLUMN_WIDTH, -height);
};

var getMaxTime = function (times) {
  var maxTime = times[0];

  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return maxTime;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderStatisticsText(ctx);

  var maxTime = getMaxTime(times);
  var columnHeight;
  var columnX = COLUMN_X_BEGIN;
  var barScale = COLUMN_HEIGHT / maxTime;
  var indent = COLUMN_WIDTH + COLUMN_DISTANCE;
  var barTextX;

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = STATISTICS_TEXT_COLOR;
    ctx.font = STATISTICS_TEXT_FONT;
    barTextX = TEXT_X_BEGIN + i * (COLUMN_WIDTH + COLUMN_DISTANCE);
    ctx.fillText(Math.round(times[i]), barTextX, CLOUD_HEIGHT - (barScale * times[i]) - STATISTICS_FONT_HEIGHT * 1.5);
    ctx.fillText(names[i], barTextX, CLOUD_HEIGHT);
    columnHeight = times[i] * barScale;
    renderBar(ctx, columnX, COLUMN_Y_BEGIN, columnHeight, renderBarColor(names[i]));
    columnX += indent;
  }
};
