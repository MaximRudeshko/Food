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

export default modal;
export {openModal};
export {closeModal};