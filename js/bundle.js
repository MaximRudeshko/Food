/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc(){
    
    const result = document.querySelector('.calculating__result span');
    let sex,height,weight,age,ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio')
    }else{
        ratio = '1.375'
        localStorage.setItem('ratio', '1.375')
    }

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '0';
            return
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }
    }

    calcTotal();

    function initLocalSettings(parentSelector,activeClass){
        const elements = document.querySelectorAll(parentSelector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInfo(parentSelector,activeClass){
        const elements = document.querySelectorAll(parentSelector);

        elements.forEach(elem => {
            elem.addEventListener('click', e => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass);

                calcTotal();
            })
        })
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red'
            }else{
                input.style.border = ''
            }

            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
    
    class MenuCard{
        constructor(src, altimg, title, discription, price, parentSelector){
            this.src = src,
            this.altimg = altimg,
            this.title = title,
            this.discription = discription,
            this.price = price,
            this.parent = document.querySelector(parentSelector)
        }

        render(){
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt="vegy">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.discription}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getData"])('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img,altimg,title,descr,price}) => {
                new MenuCard(img,altimg,title,descr,price, '.menu .container').render()
            })
        })

    /* axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img,altimg,title,descr,price}) => {
                new MenuCard(img,altimg,title,descr,price, '.menu .container').render()
            })        
        }) */

}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms (formSelector, modalTimer) {

    const forms = document.querySelectorAll(formSelector);

    const message = {
        success: 'Мы вам перезвоним',
        failure: 'Error!!!',
        loading: "img/spinner.svg"
    }

    forms.forEach(item => {
        bindPostData(item)
    });

    function bindPostData(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();


            let spinner = document.createElement('img');
            spinner.src = message.loading;
            spinner.style.cssText = `
                    display: block;
                    margin: 0 auto
                `;
            form.insertAdjacentElement('afterend', spinner);

            const formData = new FormData(form);
            const newDataObj = {}

            formData.forEach((item, i) => {
                newDataObj[i] = item
            });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json).then((data) => {
                showThanksModal(message.success);
                spinner.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                spinner.remove();
            }).finally(() => {
                form.reset()
            });

            function showThanksModal(message) {
                let prevDialogModal = document.querySelector('.modal__dialog');

                prevDialogModal.style.display = 'none';
                Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimer);

                let thanksModal = document.createElement('div');
                thanksModal.classList.add('modal__dialog');
                thanksModal.innerHTML = `
                        <div class = "modal__content">
                            <div data-close class="modal__close">&times;</div>
                            <div class="modal__title">${message}</div>
                        </div>
                    `;

                document.querySelector('.modal').append(thanksModal);

                setTimeout(() => {
                    thanksModal.remove();
                    prevDialogModal.style.display = 'block';
                    Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal')
                }, 4000)
            }


        });

    };
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, openModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden';
    if(modalTimer){
        clearInterval(modalTimer);
    } 
}

function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = ''
}

function modal(triggerSelector, modalSelector) {

    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    trigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector))
    })

    modal.addEventListener('click', e => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector)
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            closeModal(modalSelector)
        }
    })

    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector);
            window.removeEventListener('scroll', openModalByScroll)
        }
    }

    window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({container,slide,wrapper,inner,next,prev,currentCount,totalCount /* selectors */}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = document.querySelector(inner),
        sliderNext = document.querySelector(next),
        sliderPrev = document.querySelector(prev),
        current = document.querySelector(currentCount),
        total = document.querySelector(totalCount),
        width = window.getComputedStyle(sliderWrapper).width;

    let currentSlideIndex = 1,
        offset = 0;

    addZero();

    sliderInner.style.display = 'flex';
    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.transition = '.7s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = width);

    // indicators for slider

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        indicators.append(dot);
        dots.push(dot);

        if (i == 0) {
            dot.style.opacity = 1
        }
    }

    sliderNext.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0;
            console.log(offset);
        } else {
            offset += deleteNoDigits(width);
            console.log(offset);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == slides.length) {
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
            console.log(currentSlideIndex)
        };
        addZero();
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideIndex - 1].style.opacity = 1;

    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1);
            console.log(offset);
        } else {
            offset -= deleteNoDigits(width);
            console.log(offset);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == 1) {
            currentSlideIndex = slides.length
        } else {
            currentSlideIndex--;
        }

        addZero();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlideIndex = slideTo;
            offset = deleteNoDigits(width) * (currentSlideIndex - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[currentSlideIndex - 1].style.opacity = 1;

            addZero();
        })
    })

    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${currentSlideIndex}`;
            total.textContent = `0${slides.length}`;
        } else {
            current.textContent = currentSlideIndex;
            total.textContent = slides.length;
        }
    }

    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '');
    };
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabSelector,contentSelector,parentSelector,activeClass) {
    
    const tabs = document.querySelectorAll(tabSelector),
        tabContent = document.querySelectorAll(contentSelector),
        tabsParent = document.querySelector(parentSelector);

    const hideTabContent = () => {
        tabContent.forEach(item => {
            item.style.display = 'none'
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    const showTabContent = (i = 0) => {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains(tabSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }

            })
        }
    })
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(deadLine,timerSelector) {
    
    function getTimeRemaining() {
        const t = Date.parse(deadLine) - Date.parse(new Date),
            day = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': day,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock() {
        const timer = document.querySelector(timerSelector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)

        updateClock();

        function updateClock() {
            const t = getTimeRemaining();

            days.innerHTML = addZeroBeforeNum(t.days);
            hours.innerHTML = addZeroBeforeNum(t.hours);
            minutes.innerHTML = addZeroBeforeNum(t.minutes);
            seconds.innerHTML = addZeroBeforeNum(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    function addZeroBeforeNum(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    setClock();
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











document.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimer), 60000);

    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-modal]', '.modal', modalTimer);
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimer);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        currentCount: '#current',
        totalCount: '#total'
    });
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('2020-05-30','.timer');
});






/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json()
}

async function getData(url){
    let res = await fetch(url)
    if(!res.ok){
        throw new Error(`${res.status}`)
    }
    return await res.json();
}




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map