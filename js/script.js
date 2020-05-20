'use strict'
document.addEventListener('DOMContentLoaded', () => {
    const modal = require('./modules/modal'),
          calc = require('./modules/calc'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');
          
    modal();
    calc();
    cards();
    forms();
    slider();
    tabs();
    timer();
});




