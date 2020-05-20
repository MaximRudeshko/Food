function slider({container,slide,wrapper,inner,next,prev,currentCount,totalCount /* selectors */}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = document.querySelector(inner),
        sliderNext = document.querySelector(next),
        sliderPrev = document.querySelector(prev),
        current = document.querySelector(currentCount),
        total = document.querySelector(totalCount),
        width = window.getComputedStyle(sliderWrapper).width;

    let currentSlideIndex = 1,
        offset = 0;

    addZero();

    sliderInner.style.display = 'flex';
    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.transition = '.7s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = width);

    // indicators for slider

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        indicators.append(dot);
        dots.push(dot);

        if (i == 0) {
            dot.style.opacity = 1
        }
    }

    sliderNext.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0;
            console.log(offset);
        } else {
            offset += deleteNoDigits(width);
            console.log(offset);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == slides.length) {
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
            console.log(currentSlideIndex)
        };
        addZero();
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideIndex - 1].style.opacity = 1;

    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1);
            console.log(offset);
        } else {
            offset -= deleteNoDigits(width);
            console.log(offset);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == 1) {
            currentSlideIndex = slides.length
        } else {
            currentSlideIndex--;
        }

        addZero();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlideIndex = slideTo;
            offset = deleteNoDigits(width) * (currentSlideIndex - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[currentSlideIndex - 1].style.opacity = 1;

            addZero();
        })
    })

    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${currentSlideIndex}`;
            total.textContent = `0${slides.length}`;
        } else {
            current.textContent = currentSlideIndex;
            total.textContent = slides.length;
        }
    }

    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '');
    };
}

export default slider;