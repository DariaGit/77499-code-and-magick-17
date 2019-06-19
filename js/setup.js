'use strict';

var WIZARDS_COUNT = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var ROBES_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

var generateColor = function (arrColors) {
  return getRandomElement(arrColors);
};

var generateWizard = function () {
  return {
    name: generateWizardFullName(),
    coatColor: generateColor(ROBES_COLORS),
    eyesColor: generateColor(EYES_COLORS)
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

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var wizards = generateWizards(WIZARDS_COUNT);

renderWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');

// ========================Обработка событий. Учебный проект: одеть Надежду.=========================================================
var setupElement = document.querySelector('.setup'); // получаем доступ к дом-элементу попапа настроек

// открывает попап
var openSetupPopup = function () {
  setupElement.classList.remove('hidden');
};

// закрывает попап
var closeSetupPopup = function () {
  setupElement.classList.add('hidden');
};

var setupOpenIconElement = document.querySelector('.setup-open-icon'); // получаем доступ к дом-элементу иконки, открывающей попап

setupOpenIconElement.addEventListener('click', function () {
  openSetupPopup();
});

// Когда иконка пользователя в фокусе .setup-open-icon, то окно настройки персонажа должно открываться по нажатию кнопки ENTER.
// Не забудьте добавить  tabindex="0" для иконки пользователя, чтобы она фокусировалась;

setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openSetupPopup();
  }
});

// Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог.
// Если фокус находится на форме ввода имени, то окно закрываться не должно;
var setupUserNameElement = setupElement.querySelector('.setup-user-name'); // получаем доступ к полю ввода имени
var setupUserNameElementOnFocus = false;

setupUserNameElement.addEventListener('focus', function () {
  setupUserNameElementOnFocus = true;
});

setupUserNameElement.addEventListener('blur', function () {
  setupUserNameElementOnFocus = false;
});

document.addEventListener('keydown', function (evt) {
  if (setupUserNameElementOnFocus === false) {
    if (evt.keyCode === 27) {
      closeSetupPopup();
    }
  }
});


// Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
var setupCloseElement = setupElement.querySelector('.setup-close');

setupCloseElement.addEventListener('click', function () {
  closeSetupPopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeSetupPopup();
  }
});

// Валидация ввода имени персонажа. Имя персонажа вводится в поле .setup-user-name. Добавьте следующие ограничения:
// -имя персонажа не может содержать менее 2 символов;
// -максимальная длина имени персонажа — 25 символов.
// Для указания ограничений на ввод используйте стандартные возможности форм HTML5.

setupUserNameElement.addEventListener('invalid', function () {
  if (setupUserNameElement.validity.tooShort) {
    setupUserNameElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserNameElement.validity.tooLong) {
    setupUserNameElement.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserNameElement.validity.valueMissing) {
    setupUserNameElement.setCustomValidity('Обязательное поле');
  } else {
    setupUserNameElement.setCustomValidity('');
  }
});


// Изменение цвета мантии персонажа по нажатию. Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
// Цвет мантии задаётся через изменение инлайнового CSS-свойства fill для элемента.
// Цвет должен сменяться произвольным образом на один из следующих цветов:
// - rgb(101, 137, 164)
// - rgb(241, 43, 107)
// - rgb(146, 100, 161)
// - rgb(56, 159, 117)
// - rgb(215, 210, 55)
// - rgb(0, 0, 0)
var wizardCoatElement = setupElement.querySelector('.wizard-coat');
var coatInputElement = setupElement.querySelector('input[name="coat-color"]');

wizardCoatElement.addEventListener('click', function () {
  wizardCoatElement.style.fill = generateColor(ROBES_COLORS);
  coatInputElement.value = wizardCoatElement.style.fill;
});

// Изменение цвета глаз персонажа по нажатию. Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.
// Возможные варианты цвета глаз персонажа:
// - black
// - red
// - blue
// - yellow
// - green

var wizardEyesElement = setupElement.querySelector('.wizard-eyes');
var eyesInputElement = setupElement.querySelector('input[name="eyes-color"]');

wizardEyesElement.addEventListener('click', function () {
  wizardEyesElement.style.fill = generateColor(EYES_COLORS);
  eyesInputElement.value = wizardEyesElement.style.fill;
});

// Изменение цвета фаерболов по нажатию. Цвет задаётся через изменение фона у блока .setup-fireball-wrap. Возможные варианты цвета:
// - #ee4830
// - #30a8ee
// - #5ce6c0
// - #e848d5
// - #e6e848
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setupFireballWrapElement = setupElement.querySelector('.setup-fireball-wrap');
var fr = setupElement.querySelector('input[name="fireball-color"]');

setupFireballWrapElement.addEventListener('click', function () {
  setupFireballWrapElement.style.backgroundColor = generateColor(FIREBALL_COLORS);
  fr.value = setupFireballWrapElement.style.backgroundColor;
});
