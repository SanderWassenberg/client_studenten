// mijn eigen super coole ingewikkelde framework
const Q = {}; // Q staat voor query
{
    const dp = (n, v) => { Object.defineProperty(Q, n, { value: v }) };
    dp("s", function () { return document.querySelector(...arguments) });
    dp("sa", function () { return document.querySelectorAll(...arguments) });
    dp("id", function () { return document.getElementById(...arguments) });
    dp("class", function () { return document.getElementsByClassName(...arguments) });
    dp("tag", function () { return document.getElementsByTagName(...arguments) });
}

class GDPR {

    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        const status = this.cookieStatus;
        if (!['accept', 'reject'].includes(status)) this.showGDPR();
    }

    bindEvents() {
        Q.s('.gdpr-consent__button--accept').addEventListener('click', () => {
            this.cookieStatus = 'accept';
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });

        Q.s('.gdpr-consent__button--reject').addEventListener('click', () => {
            this.cookieStatus = 'reject';
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });

        Q.s('.gdpr-consent__button--postpone').addEventListener('click', () => {
            this.hideGDPR();
        });
    }


    showContent() {
        this.resetContent();

        const status = this.cookieStatus ?? 'postpone';
        const element = Q.s(`.content-gdpr-${status}`);

        if (!element) return;

        element.classList.remove('hide');
    }

    resetContent() {
        const classes = [
            '.content-gdpr-accept',
            '.content-gdpr-reject',
            '.content-gdpr-postpone'];

        for (const c of classes) {
            Q.s(c).classList.add('hide');
        }
    }

    showStatus() {
        const status = this.cookieStatus;

        Q.id('content-gpdr-consent-status').innerHTML = status ?? "Niet gekozen";
    }

    get cookieStatus() {
        return localStorage.getItem('gdpr-consent-choice');
    }
    set cookieStatus(status) {
        localStorage.setItem('gdpr-consent-choice', status);
    }

    hideGDPR() {
        Q.s(`.gdpr-consent`).classList.add('hide');
    }

    showGDPR() {
        Q.s(`.gdpr-consent`).classList.remove('hide');
    }
}

const gdpr = new GDPR();

