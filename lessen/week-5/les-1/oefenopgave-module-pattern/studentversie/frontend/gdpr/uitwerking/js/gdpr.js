{
    const init = () => {
        showStatus();
        showContent();
        
        // bind events
        const buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            set_cookiestatus('accept');
            showStatus();
            showContent();
            hideGDPR();
        });
        
        const buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            hideGDPR();
        });

        if(get_cookiestatus() !== 'accept') showGDPR();
    }

    const showContent = () => {
        
        // first reset the content
        const classes = [
            '.content-gdpr-accept',
            '.content-gdpr-not-chosen'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }

        // then show it
        const status = get_cookiestatus() ?? 'not-chosen';
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');

    }

    const showStatus = () => {
        document.getElementById('content-gpdr-consent-status').innerHTML = get_cookiestatus()  ?? 'Niet gekozen';
    }

    const storage_name_cookie_status = 'gdpr-consent-choice';

    const get_cookiestatus = () => localStorage.getItem(storage_name_cookie_status);

    const set_cookiestatus = status => {
        if (!status) return;
        localStorage.setItem(storage_name_cookie_status, status);
    }

    const consent_elem = document.querySelector(`.gdpr-consent`)
    
    const hideGDPR = () => {
        consent_elem.classList.add('hide');
        consent_elem.classList.remove('show');
    }

    const showGDPR = () => {
        consent_elem.classList.add('show');
    }

    init();
}
