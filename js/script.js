'use strict'

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import modal from './modules/modal';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 60000);

    modal('[data-modal]', '.modal', modalTimer);
    calc();
    cards();
    forms('form', modalTimer);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        currentCount: '#current',
        totalCount: '#total'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('2020-05-30','.timer');
});




