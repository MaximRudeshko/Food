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
        constructor(src, title, discription, price, parentSelector){
            this.src = src,
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

    new MenuCard(
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
            const newObj = {}

            formData.forEach((item, i) => {
                newObj[i] = item
            });
                   
            postData('http://localhost:3000/requests', JSON.stringify(newObj)).then((data) => {
                    showThanksModal(message.success);
                    spinner.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
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
        
    }

    fetch('http://localhost:3000/menu')
                .then(data => data.json())
                .then(res => console.log(res))

    
});




