'use strict'
document.addEventListener('DOMContentLoaded', () => {

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
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(item == target){
                    hideTabContent();
                    showTabContent(i);
                }

            })
        }
    })


    //Timer

    const deadLine = '2020-05-30';

    function getTimeRemaining(){
        const t = Date.parse(deadLine) - Date.parse(new Date),
              day = Math.floor(t/(1000 * 60 * 60 * 24)),
              hours = Math.floor(t/(1000 * 60 * 60) % 24),
              minutes = Math.floor(t/(1000 * 60) % 60),
              seconds = Math.floor((t/1000) % 60);

              return {
                  'total' : t,
                  'days' : day,
                  'hours' : hours,
                  'minutes' : minutes,
                  'seconds' : seconds
              }

    }

    function setClock(){
        const timer = document.querySelector('.timer'),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000)

        updateClock();

        function updateClock(){
            const t = getTimeRemaining();
                  


            days.innerHTML = addZeroBeforeNum(t.days);
            hours.innerHTML =addZeroBeforeNum(t.hours);
            minutes.innerHTML =addZeroBeforeNum(t.minutes);
            seconds.innerHTML =addZeroBeforeNum(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    function addZeroBeforeNum(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else{
            return num
        }
    }
    
    setClock();


    //Modal

    const trigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');;

    trigger.forEach(item => {
        item.addEventListener('click', openModal)
    })

    modal.addEventListener('click', e => {
        if(e.target == modal || e.target.getAttribute('data-close') == ''){
            modal.style.display = 'none'
            document.body.style.overflow = '';
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.style.display == 'block'){
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

    function openModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', openModalByScroll)
        }
    }

    window.addEventListener('scroll', openModalByScroll);

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


    /* new MenuCard(
        "img/tabs/vegy.jpg",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container'

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container'

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu .container'

    ).render();
 */

    //server

    const forms = document.querySelectorAll('form');

    const message = {
        success : 'Мы вам перезвоним',
        failure : 'Error!!!',
        loading : "img/spinner.svg"
    }

    forms.forEach(item => {
        bindPostData(item)
    });

    const postData = async (url, data) => {
        let res = await fetch(url , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json()
    }

    function bindPostData(form){
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

            function showThanksModal(message){
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
                },4000)
            }
            
            
        });
        
    };

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


    slides.forEach( slide => slide.style.width = width);

    
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


    for(let i = 0; i < slides.length; i++){
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

        if(i == 0){
            dot.style.opacity = 1
        }
    }

    sliderNext.addEventListener('click', () => {
        if(offset == deleteNoDigits(width) * (slides.length - 1)){
            offset = 0;
            console.log(offset);
        }else{
            offset += deleteNoDigits(width);
            console.log(offset);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(currentSlideIndex == slides.length){
            currentSlideIndex = 1;
        }else{
            currentSlideIndex++;
            console.log(currentSlideIndex)
        };
        addZero();
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideIndex - 1].style.opacity = 1;
        
    });

    sliderPrev.addEventListener('click', () => {
        if(offset == 0){
            offset = deleteNoDigits(width) * (slides.length - 1);
            console.log(offset);
        }else{
            offset -= deleteNoDigits(width);
            console.log(offset);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(currentSlideIndex == 1){
            currentSlideIndex = slides.length
        }else{
            currentSlideIndex--;
        }

        addZero();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click',e => {
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
        if(slides.length < 10){
            current.textContent = `0${currentSlideIndex}`;
            total.textContent = `0${slides.length}`;
        }else{
            current.textContent = currentSlideIndex;
            total.textContent = slides.length;
        }
    }

    function deleteNoDigits(str){
        return +str.replace(/\D/g, '');
    };


    //Calc

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height,weight,age,
        ratio = 1.375;

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

    function getStaticInfo(parentSelector,activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', e => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio')
                }else{
                    sex = e.target.getAttribute('id')
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass);

                calcTotal();
            })
        })
    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
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

    






        

    
 

    


    





    
    
});




