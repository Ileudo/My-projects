/*CONSTANTS*/
const filters = document.querySelector('.filters');
const inputs = Array.from(document.querySelectorAll('.filters input'));
const outputs = Array.from(document.querySelectorAll('.filters output'));
const image = document.querySelector('.image');
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

const btnContainer = document.querySelector('.btn-container');
const btnReset = document.querySelector('.btn-reset');
const btnNext = document.querySelector('.btn-next');
const btnLoad = document.querySelector('.btn-load');
const fileInput = document.querySelector('.btn-load--input');
const btnSave = document.querySelector('.btn-save');

/*CHANGE VALUE OF FILTER OUTPUT*/
filters.addEventListener('input', function (event) {
	outputValue(event.target);
	setFilterVariables(event.target);
})

function outputValue(input) {
	input.parentNode.children.namedItem('result').value = input.value;
};
function setFilterVariables(input) {
	let suffix = input.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
}


/*RESET*/
function reset() {
	inputs.map((input) => {
		input.parentNode.children.namedItem('result').value = input.defaultValue;
		input.value = input.defaultValue;
		document.documentElement.style.removeProperty(`--${input.name}`)
	});
}

btnReset.addEventListener('click', reset);


/*NEXT PICTURE*/
let dateNow = new Date();
let timesOfDay;
switch (Math.floor((dateNow.getHours()) / 6)) {
	case 0: timesOfDay = 'night'; break;
	case 1: timesOfDay = 'morning'; break;
	case 2: timesOfDay = 'day'; break;
	case 3: timesOfDay = 'evening'; break;
}

let imageSwitchCounter = 0;
let imageIndex;
let imageLink;
function formLink() {
	imageIndex = imageSwitchCounter % images.length;
	imageLink = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay}/${images[imageIndex]}`
	viewImage(imageLink);
	imageSwitchCounter++;
	// btnNext.disabled = true;
	// setTimeout(() => btnNext.disabled = false, 2000);
}
function viewImage(src) {
	const imageCache = document.createElement('img');
	imageCache.src = src;
	imageCache.onload = () => {
		image.setAttribute('src', src);
		imageCache.remove();
	};
}
btnNext.addEventListener('click', formLink);


/*LOAD*/
function showLoadedImage(event) {
	const file = fileInput.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		image.src = reader.result;
		fileInput.value = '';
	};
};

fileInput.addEventListener('change', showLoadedImage);


/*SAVE*/
function setCanvasFilter(originalImage, containerImage) {
	let canvasFilter = '';
	let arrCanvasFilter = [];
	let blurCoef = 1;
	inputs.forEach((input) => {
		if (input.name === 'blur') {
			blurCoef = originalImage.height / containerImage.height;
			arrCanvasFilter.push(`${input.name}(${blurCoef * input.value}${input.dataset.sizing})`);
		} else {
			arrCanvasFilter.push(`${input.name}(${input.value}${input.dataset.sizing})`);
		}
	})
	canvasFilter = arrCanvasFilter.join(' ');
	return canvasFilter;
}

function saveImage() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const a = document.createElement('a');
	a.setAttribute('download', '');
	const imageForExport = document.createElement('img');
	imageForExport.setAttribute('crossOrigin', 'anonymous');
	imageForExport.setAttribute('src', image.src);
	imageForExport.onload = () => {
		canvas.width = imageForExport.width;
		canvas.height = imageForExport.height;
		ctx.filter = setCanvasFilter(canvas, image);
		ctx.drawImage(imageForExport, 0, 0);
		a.setAttribute('href', canvas.toDataURL("image/png"));
		a.click();
		a.remove();
		canvas.remove();
		imageForExport.remove();
	}
}

btnSave.addEventListener('click', saveImage);


/*FULLSCREEN*/
const btnFullscreen = document.querySelector('.fullscreen');
btnFullscreen.addEventListener('click', toggleFullscreen);
function toggleFullscreen() {
	if (document.fullscreenEnabled) {
		if (document.fullscreenElement === null) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
}

/*CHANGE COLOR OF ACTIVE BUTTON*/
function changeActiveButtonColor(event) {
	let btnActive = document.querySelector('.btn-active');
	btnActive.classList.remove('btn-active');
	if (event.target.classList.contains('btn')) {
		event.target.classList.add('btn-active');
	} else if (event.target === fileInput) {
		btnLoad.classList.add('btn-active');
	}
}

btnContainer.addEventListener('click', changeActiveButtonColor);