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