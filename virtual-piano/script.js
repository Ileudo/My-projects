const pianoKeys = Array.from(document.querySelectorAll('.piano-key'));
//==========================================
//Проигрывание по нажатию кнопки клавиатуры
//==========================================
window.addEventListener('keydown', playAudioKeyboard);

function playAudioKeyboard(event) {
	let audio = document.querySelector(`audio[data-code="${event.code}"]`);
	let pianoKey = document.querySelector(`.piano-key[data-code="${event.code}"]`);//div вместо .piano-key
	if (!audio) return;
	if (event.repeat) return;

	pianoKey.classList.add('piano-key-active');
	audio.currentTime = 0;
	audio.play();
}


window.addEventListener('keyup', keyUp);

function keyUp(event) {
	let audio = document.querySelector(`audio[data-code="${event.code}"]`);
	let pianoKey = document.querySelector(`.piano-key[data-code="${event.code}"]`);
	pianoKey.classList.remove('piano-key-active');
}


//==========================================
//Проигрывание по клику мыши
//==========================================
window.addEventListener('mousedown', playAudioMouse);
function playAudioMouse(event) {
	let pianoKeyActive = event.target.dataset.code; //или getAttribute('data-code')
	let audio = document.querySelector(`audio[data-code="${pianoKeyActive}"]`);
	let pianoKey = document.querySelector(`.piano-key[data-code="${pianoKeyActive}"]`);
	if (!audio) return;

	pianoKey.classList.add('piano-key-active');
	audio.currentTime = 0;
	audio.play();
}

pianoKeys.forEach(function (element) {
	element.addEventListener('mouseup', mouseUp);
});
function mouseUp(event) {
	event.target.classList.remove('piano-key-active');
}
//==========================================
//Проигрывание при зажатой левой кнопке мыши
//==========================================
let isMouseDown = false;
let isLeftButton = false;

pianoKeys.forEach(function (elem) {
	elem.addEventListener('mousedown', function (event) {

		isMouseDown = true;
		console.log(isMouseDown);

		if (event.which == 1) {
			isLeftButton = true;
			console.log(isLeftButton);
		}
	})
});

window.addEventListener('mouseup', function (event) {
	isMouseDown = false;
	console.log(isMouseDown);

	if (event.which == 1) {
		isLeftButton = true;
	}
});

pianoKeys.forEach(function (elem) {
	elem.addEventListener('mouseover', function (event) {
		if (isMouseDown && isLeftButton) {
			let pianoKeyActive = event.target.getAttribute('data-code');///или dataset.code
			let audio = document.querySelector(`audio[data-code="${pianoKeyActive}"]`);
			let pianoKey = document.querySelector(`.piano-key[data-code="${pianoKeyActive}"]`);
			if (!audio) return;
			if (!pianoKey) return;

			pianoKey.classList.add('piano-key-active');
			audio.currentTime = 0;
			audio.play();
		}
	})
});

pianoKeys.forEach(function (elem) {
	elem.addEventListener('mouseout', function (event) {
		event.target.classList.remove('piano-key-active');
	})
});

//==============================================
//ПЕРЕКЛЮЧАТЕЛЬ LETTER-NOTES
//==============================================
const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');
btnLetters.addEventListener('click', showBtnLetters);
function showBtnLetters(event) {
	pianoKeys.forEach(function (element) {
		element.classList.add('piano-key-active-pseudo');
	});
	btnLetters.classList.add('btn-active');
	btnNotes.classList.remove('btn-active');
}
btnNotes.addEventListener('click', showBtnNotes);
function showBtnNotes(event) {
	pianoKeys.forEach(function (element) {
		element.classList.remove('piano-key-active-pseudo');
	});
	btnLetters.classList.remove('btn-active');
	btnNotes.classList.add('btn-active');
}
//==============================================
//FULLSCREEN
//==============================================
const fullscreen = document.querySelector('.fullscreen');
fullscreen.addEventListener('click', check);
function check() {
	console.log(document.fullscreenEnabled);
	console.log(document.fullscreenElement);
}
fullscreen.addEventListener('click', openFullscreen);
function openFullscreen() {
	if (document.fullscreenElement === null) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.fullscreenEnabled) {
			document.exitFullscreen();
		}
	}
}