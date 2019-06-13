'use strict';

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var robesColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards;
var setupElement = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
  }
  return randomElement;
}

var generateWizardFullName = function (arrNames, arrSernames) {
  return getRandomElement(shuffle(arrNames)) + ' ' + getRandomElement(shuffle(arrSernames));
};

var generateColor = function (arrColors) {
  return getRandomElement(shuffle(arrColors));
};

var generateWizard = function (firstNamesArr, lastNamesArr) {
  return {
    name: generateWizardFullName(firstNamesArr, lastNamesArr),
    coatColor: generateColor(robesColors),
    eyesColor: generateColor(eyesColors)
  };
};

var generateWizards = function (wizardsNumber, firstNamesArr, lastNamesArr) {
  var wizardsArr = [];
  for (i = 0; i < wizardsNumber; i++) {
    wizardsArr.push(generateWizard(firstNamesArr, lastNamesArr));
  }
  return wizardsArr;
};

wizards = generateWizards(4, firstNames, lastNames);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

setupElement.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
