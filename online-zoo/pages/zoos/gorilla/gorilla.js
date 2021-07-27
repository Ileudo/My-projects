const buttonBurger = document.querySelector('.burger');
const menuToggle = document.querySelector('.menu-header');
const page = document.querySelector('.page');
buttonBurger.addEventListener('click', () => {
	buttonBurger.classList.toggle('active');
	menuToggle.classList.toggle('active');
})


/*OPEN SIDEBAR*/
const sidebar = document.querySelector('.aside');
const sliderSidebar = document.querySelector('.aside__slider');
const buttonOpenSidebar = document.querySelector('.block-live__button-more');
const buttonScrollSidebar = document.querySelector('.block-down__button-down');
const blocksAnimal = document.querySelectorAll('.block-animal');
let slideIndex = 0;

let blockAnimalHeight = blocksAnimal[0].offsetHeight;
window.addEventListener('resize', () => {
	blockAnimalHeight = blocksAnimal[0].offsetHeight;
})
buttonOpenSidebar.addEventListener('click', (event) => {
	sidebar.classList.toggle('active');
})
buttonScrollSidebar.addEventListener('click', () => {
	let invisibleElms = blocksAnimal.length - 4;
	slideIndex++;
	if (slideIndex > invisibleElms) slideIndex = 0;
	sliderSidebar.scrollTo(0, blockAnimalHeight * slideIndex);
})

/*VIDEO REPLACE ON CLICK*/
const mainVideo = document.querySelector('.live__video');
const mainVideoLink = mainVideo.querySelector('.live__video-link');
const sliderVideoLinks = document.querySelectorAll('.slider-live__video-link');


sliderVideoLinks.forEach((sliderVideoLink) => {
	sliderVideoLink.addEventListener('click', (e) => {
		e.preventDefault();

		let live = document.querySelector('.slider-live__video-wrapper.data-live');
		live.classList.remove('data-live');
		sliderVideoLink.closest('.slider-live__video-wrapper').classList.add('data-live');

		if (!mainVideo.querySelector('iframe')) {
			replaceVideo(sliderVideoLink);
			setupVideo(mainVideo);
		} else {
			resetVideo(sliderVideoLink);
		}
	})
})
function replaceVideo(sliderLink) {
	let posterMain = mainVideo.querySelector('.video__poster img');
	let posterSlider = sliderLink.querySelector('.video__poster img');
	let headerSlider = sliderLink.querySelector('.slider-live__video-header-text--cam').textContent.toLowerCase();
	let headerMain = mainVideo.querySelector('.live__video-header');
	headerMain.textContent = headerMain.textContent.replace(/cam [0-9]+/, headerSlider);
	mainVideoLink.href = sliderLink.href;
	posterMain.src = posterSlider.src;
}
function resetVideo(sliderVideoLink) {
	let iframe = mainVideo.querySelector('iframe');
	let id = parseMediaURL(sliderVideoLink);
	let url = generateURL(id);
	iframe.src = url;

}

setupVideo(mainVideo);
function setupVideo(video) {
	const link = video.querySelector('.live__video-link');
	const poster = video.querySelector('.video__poster--main');
	const button = video.querySelector('.video__playbtn-wrapper--main');
	let id = parseMediaURL(link);
	video.onclick = (e) => {
		let iframe = createIframe(id);
		link.style.display = 'none';
		button.style.display = 'none';
		video.appendChild(iframe);
	}

	link.removeAttribute('href');
}

function parseMediaURL(link) {
	let regexp = /https:\/\/youtu.be\/([a-zA-Z0-9_-]+)/i;
	let url = link.href;
	let match = url.match(regexp);
	return match[1];
}

function createIframe(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('live__video-embed');

	return iframe;
}

function generateURL(id) {
	let query = 'rel=0&showinfo=0&autoplay=1&mute=1'
	return `https://www.youtube.com/embed/${id}?${query}`
}


/*CAROUSEL*/

function scrollCarousel() {
	const slider = document.querySelector('.slider-live__body');
	const prev = document.querySelector('.slider-live__arrow--left');
	const next = document.querySelector('.slider-live__arrow--right');
	const slide = document.querySelector('.slider-live__video-wrapper');
	let slideWidth = slide.offsetWidth;
	let gap = parseInt(window.getComputedStyle(slide).getPropertyValue('margin-right'));
	let count = 0;

	next.addEventListener('click', (e) => {
		if (count < 3) {
			count++;
			slider.scrollTo((slideWidth + gap) * count, 0);
		}
	})

	prev.addEventListener('click', (e) => {
		if (count > 0) {
			count--;
			slider.scrollTo((slideWidth + gap) * count, 0);
		}
	})
}
scrollCarousel();
window.addEventListener('resize', scrollCarousel);




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
		buttonCompleteThirdPopup.addEventListener('click', completeDonation);
	}
}

creditCardNumber.addEventListener('input', validateThirdPopup);
cvvNumber.addEventListener('input', validateThirdPopup);
selectBoxMonth.addEventListener('click', validateThirdPopup);
selectBoxYear.addEventListener('click', validateThirdPopup);