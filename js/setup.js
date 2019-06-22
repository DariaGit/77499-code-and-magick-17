'use strict';

var WIZARDS_COUNT = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var ROBES_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var KEY_CODE_ENTER = 13;
var KEY_CODE_ESC = 27;

var Errors = {
  TOO_SHORT: {
    validity: 'tooShort',
    message: 'Имя должно состоять минимум из 2-х символов'
  },
  TOO_LONG: {
    validity: 'tooLong',
    message: 'Имя не должно превышать 25-ти символов'
  },
  VALUE_MISSING: {
    validity: 'valueMissing',
    message: 'Обязательное поле'
  }
};

var generateRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  var randomIndex = generateRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

var generateWizardFullName = function () {
  return getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(LAST_NAMES);
};

var generateWizard = function () {
  return {
    name: generateWizardFullName(),
    coatColor: getRandomElement(ROBES_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
};

var generateWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push(generateWizard());
  }
  return wizards;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var openSetupPopup = function () {
  setupElement.classList.remove('hidden');
};

var closeSetupPopup = function () {
  setupElement.classList.add('hidden');
};

var isUserNameElementFocused = false;
var setupElement = document.querySelector('.setup');
var setupOpenIconElement = document.querySelector('.setup-open-icon');
var setupUserNameElement = setupElement.querySelector('.setup-user-name');
var setupCloseElement = setupElement.querySelector('.setup-close');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizardCoatElement = setupElement.querySelector('.wizard-coat');
var coatInputElement = setupElement.querySelector('input[name="coat-color"]');
var wizardEyesElement = setupElement.querySelector('.wizard-eyes');
var eyesInputElement = setupElement.querySelector('input[name="eyes-color"]');
var setupFireballWrapElement = setupElement.querySelector('.setup-fireball-wrap');
var fireballColorInputElement = setupElement.querySelector('input[name="fireball-color"]');

var wizards = generateWizards(WIZARDS_COUNT);

renderWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');

setupUserNameElement.addEventListener('invalid', function () {
  var foundKey = Object.keys(Errors).find(function (key) {
    var error = Errors[key];
    return setupUserNameElement.validity[error.validity];
  });

  var error = Errors[foundKey];
  var message = error ? error.message : '';

  setupUserNameElement.setCustomValidity(message);
});

wizardCoatElement.addEventListener('click', function () {
  var color = getRandomElement(ROBES_COLORS);
  wizardCoatElement.style.fill = color;
  coatInputElement.value = color;
});

wizardEyesElement.addEventListener('click', function () {
  var color = getRandomElement(EYES_COLORS);
  wizardEyesElement.style.fill = color;
  eyesInputElement.value = color;
});

setupFireballWrapElement.addEventListener('click', function () {
  var color = getRandomElement(FIREBALL_COLORS);
  setupFireballWrapElement.style.backgroundColor = color;
  fireballColorInputElement.value = color;
});

setupCloseElement.addEventListener('click', function () {
  closeSetupPopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    closeSetupPopup();
  }
});

setupUserNameElement.addEventListener('focus', function () {
  isUserNameElementFocused = true;
});

setupUserNameElement.addEventListener('blur', function () {
  isUserNameElementFocused = false;
});

document.addEventListener('keydown', function (evt) {
  if (isUserNameElementFocused === false && evt.keyCode === KEY_CODE_ESC) {
    closeSetupPopup();
  }
});

setupOpenIconElement.addEventListener('click', function () {
  openSetupPopup();
});

setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    openSetupPopup();
  }
});
