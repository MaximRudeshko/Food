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