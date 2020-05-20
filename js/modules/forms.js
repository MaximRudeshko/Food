import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
                openModal('.modal', modalTimer);

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
                    closeModal('.modal')
                }, 4000)
            }


        });

    };
}

export default forms;