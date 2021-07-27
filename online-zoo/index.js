const buttonBurger = document.querySelector('.burger');
const menuToggle = document.querySelector('.menu-header');
const page = document.querySelector('.page');
buttonBurger.addEventListener('click', () => {
	buttonBurger.classList.toggle('active');
	menuToggle.classList.toggle('active');
})

/*POPUP*/
const body = document.body;
const allPopups = document.querySelectorAll('.popup');
const donationPopupWindow = document.querySelector('.donation-popup-window')
const popupCloseIcons = document.querySelectorAll('.popup__close-icon');
let popupLinks = document.querySelectorAll('.popup-link');
/*Landing*/
const donationAmountLandingButton = document.querySelector('.donation__button-union');
const donationAmountLandingInput = document.querySelector('.donation__button-input');
/*Main Popup*/
const mainPopup = document.getElementById('main-popup');
const mainPopupDonationButtons = mainPopup.querySelectorAll('.main-popup__btn-donation');
const buttonOtherAmountMainPopup = mainPopup.querySelector('.main-popup__btn-donation--other');
/*First Popup*/
const donationFirstPopup = document.getElementById('donation-first-popup');
const firstPopupDonationSumButtons = donationFirstPopup.querySelectorAll('.donation-first-popup__sum-button');
const buttonOtherAmount = donationFirstPopup.querySelector('.donation-first-popup__sum-button--other');
const sumInput = document.querySelector('#sum-input');
const buttonNextFirstDonationPopup = donationFirstPopup.querySelector('.donation-popup-next-button');
/*Second Popup*/
const donationSecondPopup = document.querySelector('#donation-second-popup');
const donationInputName = document.getElementById('donation-name');
const donationInputEmail = document.getElementById('donation-email');
const buttonNextSecondPopup = donationSecondPopup.querySelector('.donation-popup-next-button');
/*Third Popup*/
const donationThirdPopup = document.querySelector('#donation-third-popup');
const creditCardNumber = document.querySelector('#credit-card-number');
const cvvNumber = document.querySelector('#cvv-number');
const buttonCompleteThirdPopup = donationThirdPopup.querySelector('.donation-third-popup__complete-button');


/*ОТКРЫТИЕ/ЗАКРЫТИЕ ПОПАПОВ*/
function openPopup(popupLink) {
	let popupName = popupLink.getAttribute('data-popup');
	let nextPopup = document.getElementById(popupName);
	const activePopup = document.querySelector('.popup.opened');
	if (activePopup) {
		activePopup.classList.remove('opened');
		activePopup.classList.add('closed');
	}
	nextPopup.classList.remove('closed');
	nextPopup.classList.add('opened');
	body.classList.add('notScrollable');
}

popupLinks.forEach((popupLink) => {
	popupLink.addEventListener('click', function (event) {
		openPopup(popupLink);
		event.preventDefault(); /*Запрещаю перезагружать страницу при клике по ссылке*/
	});
})


function closePopup(currentPopup) {
	console.log('close');
	currentPopup.classList.add('closed');
	currentPopup.classList.remove('opened');
	body.classList.remove('notScrollable');
}

popupCloseIcons.forEach((popupCloseIcon) => {
	popupCloseIcon.addEventListener('click', () => {
		let currentPopup = popupCloseIcon.closest('.popup');
		closePopup(currentPopup);
	})
});

allPopups.forEach((popup) => {
	popup.addEventListener('mousedown', (event) => {
		if (event.target === popup) closePopup(popup);
	})
})


/*ЗАПОЛНЕНИЕ СУММЫ ДОНАТА ПО НАЖАТИЮ НА КНОПКУ*/
/*При переходе с лэндинга*/
function setActiveClass(button) {
	let buttonActive = donationFirstPopup.querySelector('.donation-first-popup__sum-button.active');
	if (buttonActive) buttonActive.classList.remove('active');
	button.classList.add('active');
}

donationAmountLandingButton.addEventListener('click', (event) => {
	if (donationAmountLandingInput.value) {
		sumInput.value = donationAmountLandingInput.value;
		setActiveClass(buttonOtherAmount);
		firstPopupDonationSumButtons.forEach((button) => {
			if (donationAmountLandingInput.value === button.textContent.replace(/\D/g, '')) {
				setActiveClass(button);
			}
		})
	} else {
		setActiveClass(firstPopupDonationSumButtons[0]);
		sumInput.value = firstPopupDonationSumButtons[0].textContent.replace(/\D/g, '');
	}
	donationAmountLandingInput.value = '';
})

/*При переходе с основного попапа*/
function getSum(sumButton) {
	let donationSum = sumButton.textContent.replace(/\D/g, '');
	sumInput.value = donationSum;
}

mainPopup.addEventListener('click', function (event) {
	mainPopupDonationButtons.forEach((button) => {
		if (event.target === buttonOtherAmountMainPopup) {
			sumInput.focus();
			setActiveClass(buttonOtherAmount);
		}
		else if (event.target === button) {
			getSum(button);
			firstPopupDonationSumButtons.forEach((button1) => {
				if (button1.textContent === button.textContent) setActiveClass(button1);
			})
		}
	})
})
/*При клике на сумму в первом попапе*/
donationFirstPopup.addEventListener('click', function (event) {
	firstPopupDonationSumButtons.forEach((button) => {
		if (event.target === button) {
			setActiveClass(button);
			getSum(button);
			event.preventDefault();
		}
	})
})
/*При клике на кнопку Donation Amount — фокус на инпуте*/
buttonOtherAmount.onclick = () => {
	sumInput.value = '';
	sumInput.focus()
};
sumInput.oninput = () => setActiveClass(buttonOtherAmount);


/*SELECT-BOX*/
const selectBoxPet = document.querySelector('.select-box-pet');
const selectedPet = selectBoxPet.querySelector('.selected');
const optionsContainerPet = selectBoxPet.querySelector('.options-container');
const optionsListPet = selectBoxPet.querySelectorAll('.select-box .option');
const selectInputPet = selectBoxPet.querySelector('.select-input');
const labelForSpecialPet = donationFirstPopup.querySelector('.donation-first-popup__favourite-pet-label');

labelForSpecialPet.addEventListener('click', () => {
	optionsContainerPet.classList.toggle('active');
})
selectedPet.addEventListener('click', () => {
	optionsContainerPet.classList.toggle('active');
});
optionsListPet.forEach((option) => {
	option.addEventListener('click', (event) => {
		selectedPet.textContent = option.querySelector('label').textContent;
		selectInputPet.value = selectedPet.textContent;
		optionsContainerPet.classList.remove('active');
	})
})

const selectBoxMonth = document.querySelector('.select-box-month');
const selectedMonth = selectBoxMonth.querySelector('.selected');
const optionsContainerMonth = selectBoxMonth.querySelector('.options-container');
const optionsListMonth = selectBoxMonth.querySelectorAll('.select-box .option');
const selectInputMonth = selectBoxMonth.querySelector('.select-input');
selectedMonth.addEventListener('click', () => {
	optionsContainerMonth.classList.toggle('active');
});
optionsListMonth.forEach((option) => {
	option.addEventListener('click', (event) => {
		selectedMonth.textContent = option.querySelector('label').textContent;
		selectInputMonth.value = selectedMonth.textContent;
		optionsContainerMonth.classList.remove('active');
	})
})

const selectBoxYear = document.querySelector('.select-box-year');
const selectedYear = selectBoxYear.querySelector('.selected');
const optionsContainerYear = selectBoxYear.querySelector('.options-container');
const optionsListYear = selectBoxYear.querySelectorAll('.select-box .option');
const selectInputYear = selectBoxYear.querySelector('.select-input');
selectedYear.addEventListener('click', () => {
	optionsContainerYear.classList.toggle('active');
});
optionsListYear.forEach((option) => {
	option.addEventListener('click', (event) => {
		selectedYear.textContent = option.querySelector('label').textContent;
		selectInputYear.value = selectedYear.textContent;
		optionsContainerYear.classList.remove('active');
	})
})

/*ОГРАНИЧЕНИЯ НА ВВОД СИМВОЛОВ*/

creditCardNumber.addEventListener('input', () => {
	creditCardNumber.value = creditCardNumber.value.substring(0, 16);
})
cvvNumber.addEventListener('input', () => {
	cvvNumber.value = cvvNumber.value.substring(0, 3);
})
sumInput.addEventListener('input', () => {
	sumInput.value = sumInput.value.substring(0, 4);
})

/*ВАЛИДАЦИЯ*/
/*ВАЛИДАЦИЯ ПЕРВОГО ПОПАПА*/
function goToNextPopup(event) {
	openPopup(this);
	event.preventDefault();
}

function validateFirstPopup() {
	if (sumInput.validity.valid &&
		selectInputPet.validity.valid) {
		buttonNextFirstDonationPopup.classList.remove('donation-popup-next-button--invalid');
		buttonNextFirstDonationPopup.addEventListener('click', goToNextPopup);
	} else {
		buttonNextFirstDonationPopup.classList.add('donation-popup-next-button--invalid');
		buttonNextFirstDonationPopup.removeEventListener('click', goToNextPopup);
	}
}
firstPopupDonationSumButtons.forEach((button) => {
	button.addEventListener('mouseout', validateFirstPopup);
})
sumInput.addEventListener('input', validateFirstPopup);
selectBoxPet.addEventListener('click', validateFirstPopup);

/*ВАЛИДАЦИЯ ВТОРОГО ПОПАПА*/
function validateSecondPopup() {
	if (donationInputName.validity.valid &&
		donationInputEmail.validity.valid) {
		buttonNextSecondPopup.classList.remove('donation-popup-next-button--invalid');
		buttonNextSecondPopup.addEventListener('click', goToNextPopup);
	} else {
		buttonNextSecondPopup.classList.add('donation-popup-next-button--invalid');
		buttonNextSecondPopup.removeEventListener('click', goToNextPopup);
	}
}

donationInputName.addEventListener('input', validateSecondPopup);
donationInputEmail.addEventListener('input', validateSecondPopup);

/*ВАЛИДАЦИЯ ТРЕТЬЕГО ПОПАПА*/
function completeDonation() {
	if (buttonCompleteThirdPopup.classList.contains('invalid')) { return }
	else {
		document.body.classList.remove('notScrollable');
		donationThirdPopup.classList.remove('opened');
		donationThirdPopup.classList.add('closed');
		alert('Thanks for your donation');
		selectedYear.textContent = "Month";
		selectedMonth.textContent = "Year";
		selectedPet.textContent = "Choose your favourite:";
	}
}

function validateThirdPopup() {
	if (creditCardNumber.validity.valid &&
		/[0-9]{16}/.test(creditCardNumber.value) &&
		cvvNumber.validity.valid &&
		/[0-9]{3}/.test(cvvNumber.value) &&
		selectInputMonth.validity.valid &&
		selectInputYear.validity.valid) {
		buttonCompleteThirdPopup.classList.remove('donation-third-popup__complete-button--invalid');
		buttonCompleteThirdPopup.addEventListener('click', completeDonation);
	} else {
		buttonCompleteThirdPopup.classList.add('donation-third-popup__complete-button--invalid');
		// buttonCompleteThirdPopup.addEventListener('click', completeDonation);
		buttonCompleteThirdPopup.removeEventListener('click', completeDonation);
	}
}

creditCardNumber.addEventListener('input', validateThirdPopup);
cvvNumber.addEventListener('input', validateThirdPopup);
selectBoxMonth.addEventListener('click', validateThirdPopup);
selectBoxYear.addEventListener('click', validateThirdPopup);


/*SLIDER PET*/
function carouselPets() {
	const slider = document.querySelector('.slider__body');
	const sliderLine = document.querySelector('.slider__line');
	const sliderCards = document.querySelectorAll('.card');
	const next = document.querySelector('.slider__arrow--right');
	const prev = document.querySelector('.slider__arrow--left');
	let count = 0;
	let cardWidth = sliderCards[0].offsetWidth;
	let gap = parseInt(window.getComputedStyle(sliderLine).getPropertyValue('grid-column-gap'));
	const sliderLineWidth = sliderLine.offsetWidth;
	const sliderWidth = slider.offsetWidth;
	let sliderLeftPadding = parseInt(window.getComputedStyle(slider).getPropertyValue('padding-left'));
	let visibleCards = Math.floor(sliderWidth / (cardWidth + gap));
	let cardsInRow = Math.ceil(sliderLineWidth / (cardWidth + gap));
	let sliderLinePaddingRight = sliderWidth - (cardWidth * visibleCards + gap * (visibleCards - 1) + sliderLeftPadding);
	let maxCount = cardsInRow - visibleCards;
	sliderLine.style.paddingRight = sliderLinePaddingRight + 'px';
	console.log(sliderLeftPadding);

	function slideNext() {
		count++;
		if (count > maxCount) {
			count = 0;
		}
		sliderLine.style.paddingRight = sliderLinePaddingRight + 'px';
		slider.scrollTo(20 + (cardWidth + gap) * count, 0);
	}

	function slidePrev() {
		count--;
		if (count < 0) {
			count = maxCount;
		}
		slider.scrollTo((cardWidth + gap) * count, 0);
	}
	prev.addEventListener('click', slidePrev);
	next.addEventListener('click', slideNext);
}
carouselPets();
window.addEventListener('resize', carouselPets);


/*SLIDER TESTIMONIALS*/
const sliderFeedback = document.querySelector('.slider-feedback');
const sliderLineFeedback = document.querySelector('.slider-feedback__line');
const sliderCardsFeedback = document.querySelectorAll('.card-feedback');
let countFeedback = 0;
let cardWidthFeedback;
let gridGapFeedback;
let cardMaxCountFeedback;
const arrowsGroupFeedback = document.querySelector('.slider-feedback__arrows-group');
const arrowRightFeedback = document.querySelector('.slider-feedback__arrow--right');
const arrowLeftFeedback = document.querySelector('.slider-feedback__arrow--left');

function setSliderLineWidthFeedback() {
	let rows = Math.round(parseInt(window.getComputedStyle(sliderLineFeedback).getPropertyValue('height')) / parseInt(window.getComputedStyle(sliderLineFeedback).getPropertyValue('grid-template-rows')));
	cardWidthFeedback = sliderCardsFeedback[0].offsetWidth;
	gridGapFeedback = parseInt(window.getComputedStyle(sliderLineFeedback).getPropertyValue('grid-column-gap'));
	let sliderLineWidth = (cardWidthFeedback * sliderCardsFeedback.length + gridGapFeedback * (sliderCardsFeedback.length - 1)) / rows;
	let cardsFitInRow = Math.round(sliderLineWidth / cardWidthFeedback);
	// cardsMaxCountFeedback = cardsFitInRow - Math.ceil(sliderFeedback.offsetWidth / cardWidthFeedback);
	cardsMaxCountFeedback = cardsFitInRow - 2;
	sliderLineFeedback.style.width = sliderLineWidth;
	countFeedback = cardsMaxCountFeedback;
	rollSliderFeedback();
}
setSliderLineWidthFeedback();
window.addEventListener('resize', setSliderLineWidthFeedback);


function rollSliderFeedback() {
	sliderLineFeedback.style.right = countFeedback * (cardWidthFeedback + gridGapFeedback) + 'px';
}
function slideNextFeedback() {
	console.log(countFeedback);
	countFeedback++;
	console.log(countFeedback);
	if (countFeedback > cardsMaxCountFeedback) {
		countFeedback = 0;
	}
	rollSliderFeedback();
}

function slidePrevFeedback() {
	countFeedback--;
	if (countFeedback < 0) {
		countFeedback = cardsMaxCountFeedback;
	}
	rollSliderFeedback();
}
arrowLeftFeedback.addEventListener('click', slidePrevFeedback);
arrowRightFeedback.addEventListener('click', slideNextFeedback);

let autoSlidingIntervalFeedback = setInterval(slidePrevFeedback, 15000);
let autoSlidingTimeoutFeedback = null;

let delayAutoSlidingFeedback = () => {
	clearInterval(autoSlidingIntervalFeedback);
	clearTimeout(autoSlidingTimeoutFeedback);
	autoSlidingInterval = null;
}
/*mouseover*/
sliderLineFeedback.addEventListener('mousedown', delayAutoSlidingFeedback);
/*mouseleave*/
sliderLineFeedback.addEventListener('mouseup', () => {
	autoSlidingTimeoutFeedback = setTimeout(() => {
		autoSlidingIntervalFeedback = setInterval(slidePrevFeedback, 15000);
	}, 60000);
});
/*mouseover*/
arrowsGroupFeedback.addEventListener('mousedown', delayAutoSlidingFeedback);
/*mouseleave*/
arrowsGroupFeedback.addEventListener('mouseup', () => {
	autoSlidingTimeoutFeedback = setTimeout(() => {
		autoSlidingIntervalFeedback = setInterval(slidePrevFeedback, 15000);
	}, 60000);
});