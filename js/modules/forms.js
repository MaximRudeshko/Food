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