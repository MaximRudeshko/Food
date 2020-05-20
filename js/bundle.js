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
/*! no static exports found */
/***/ (function(module, exports) {

function calc(){
    //Calc

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

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards(){
    //cards

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

    async function getData(url){
        let res = await fetch(url)
        if(! res.ok){
            throw new Error(`${res.status}`)
        }
        return await res.json();
    }

    /* getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img,altimg,title,descr,price}) => {
                new MenuCard(img,altimg,title,descr,price, '.menu .container').render()
            })
        }) */

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img,altimg,title,descr,price}) => {
                new MenuCard(img,altimg,title,descr,price, '.menu .container').render()
            })        
        })

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms () {
    //forms

    const forms = document.querySelectorAll('form');

    const message = {
        success: 'Мы вам перезвоним',
        failure: 'Error!!!',
        loading: "img/spinner.svg"
    }

    forms.forEach(item => {
        bindPostData(item)
    });

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

            postData('http://localhost:3000/requests', json).then((data) => {
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
                openModal();

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
                    modal.style.display = 'none';
                    prevDialogModal.style.display = 'block';
                    document.body.style.overflow = '';
                }, 4000)
            }


        });

    };
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
    //Modal

    const trigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');;

    trigger.forEach(item => {
        item.addEventListener('click', openModal)
    })

    modal.addEventListener('click', e => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            modal.style.display = 'none'
            document.body.style.overflow = '';
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    })

    const modalTimer = setTimeout(openModal, 60000)

    function openModal() {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer)
    }

    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalByScroll)
        }
    }

    window.addEventListener('scroll', openModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
    //slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        sliderNext = document.querySelector('.offer__slider-next'),
        sliderPrev = document.querySelector('.offer__slider-prev'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
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

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    const hideTabContent = () => {
        tabContent.forEach(item => {
            item.style.display = 'none'
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }


    const showTabContent = (i = 0) => {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }

            })
        }
    })
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    //Timer

    const deadLine = '2020-05-30';

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
        const timer = document.querySelector('.timer'),
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

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
          
    modal();
    calc();
    cards();
    forms();
    slider();
    tabs();
    timer();
});






/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map