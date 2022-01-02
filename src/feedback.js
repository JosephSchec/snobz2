import './styles.css';

    let feedback = document.getElementById("feedback");
    feedback.setAttribute('data-bs-toggle', 'modal');
    feedback.setAttribute('data-bs-target', '#modalId');
    let middleSection = document.getElementById('size');

    feedback.addEventListener('click', (e) => {
        e.preventDefault();
        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade', 'show');
        modal.id = 'modalId';
        modal.setAttribute('aria-hidden', 'true');
        modal.tabIndex = '-1';
        middleSection.appendChild(modal);

        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
        modal.appendChild(modalDialog);

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalDialog.appendChild(modalContent);

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalHeader.id = 'modalLabel';
        modalContent.appendChild(modalHeader);

        let closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.classList.add('btn-close');
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.onclick = (() => document.getElementById('offcanvas').style.visibility = 'visible');
        modalHeader.appendChild(closeButton);

        let modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalContent.appendChild(modalBody);

        let form = document.createElement('form');
        modalBody.appendChild(form);

        let modalForm = document.createElement('div');
        modalForm.className = 'mb-3';
        form.appendChild(modalForm);

        let modalFormLabel = document.createElement('label');
        modalFormLabel.setAttribute('for', 'message-text');
        modalFormLabel.classList.add('col-form-label');
        modalFormLabel.textContent = 'Feedback:';
        modalForm.appendChild(modalFormLabel);

        let message = document.createElement('textarea');

        message.classList.add('form-control');
        message.id = 'message-text';
        message.placeholder = 'This site is awesome but it can be better by...';
        modalForm.appendChild(message);


        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalContent.appendChild(modalFooter);

        let sendBtn = document.createElement('button');
        sendBtn.type = 'button';
        sendBtn.classList.add('btn', 'btn-primary');
        sendBtn.id = 'sendBtn';
        sendBtn.textContent = 'Send';
        modalFooter.appendChild(sendBtn);

        sendBtn.onclick = (function () {
            if (message.value.trim() === "") {
                alert('Textarea Cannot Be Left Blank, We Apreciate Any Feedback');
            } else {


                window.Email.send({
                    Host: "smtp.gmail.com",
                    Username: "snobzfeed@gmail.com",
                    Password: 'kyicomxpubybdzie',
                    To: 'snobzfeed@gmail.com',
                    From: "snobzfeed@gmail.com",
                    Subject: "Heres Some Feedback",
                    Body: `${message.value}`
                }).then(

                );

                for (let i = 0; i < 2; i++) {
                    middleSection.removeChild(middleSection.lastChild);
                } document.body.removeChild(document.body.lastChild);

                sendBtn.setAttribute('data-bs-dismiss', 'modal');
                document.getElementById('offcanvas').style.visibility = 'visible';
            }
        });

        if (modal.hasAttribute('class', 'show') && middleSection.children.length > 3) {
            document.getElementById('offcanvas').style.visibility = 'hidden';
        }

    }
    );
