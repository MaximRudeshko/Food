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

export default tabs;