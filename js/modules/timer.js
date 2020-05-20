function timer() {
    //Timer

    const deadLine = '2020-05-30';

    function getTimeRemaining() {
        const t = Date.parse(deadLine) - Date.parse(new Date),
            day = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': day,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }

    }

    function setClock() {
        const timer = document.querySelector('.timer'),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)

        updateClock();

        function updateClock() {
            const t = getTimeRemaining();



            days.innerHTML = addZeroBeforeNum(t.days);
            hours.innerHTML = addZeroBeforeNum(t.hours);
            minutes.innerHTML = addZeroBeforeNum(t.minutes);
            seconds.innerHTML = addZeroBeforeNum(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    function addZeroBeforeNum(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    setClock();
}

module.exports = timer;