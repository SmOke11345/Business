const leftArrow = document.querySelector(".slider__arrow--left"),
    rightArrow = document.querySelector(".slider__arrow--right"),
    nav = document.querySelectorAll(".slider--bottom"),
    slider = document.querySelector(".slider__inner");

const sliderItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; // Определения количества слайдов.

const width = 500;
let activeIndex = 0;
let active = true; // Для анимации.

/**
 * Создание слайда
 * @param index
 * @param direction
 * @param prev
 */
const createSlide = (index, direction, prev) => {
    const div = document.createElement("div");
    div.classList.add("slider__item");

    direction === 1 ? slider.prepend(div) : slider.appendChild(div);

    if (prev) div.style.width = 0 + "px";

    div.innerHTML = `<p>${sliderItems[index]}</p>`;
};

/**
 * Изменение активного элемента точек навигации (nav).
 * @param index
 */
const changeNavElements = (index) => {
    for (let i = 0; i < nav[0].children.length; i++) {
        nav[0].children[i].classList.remove("active-nav");
    }
    nav[0].children[index].classList.add("active-nav");
};

/**
 * Прослушивание точек навигации, при нажатии мышью.
 */
const navListener = () => {
    const navItems = document.querySelectorAll(".slider__nav");

    navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            if (activeIndex === index) {
                return;
            }

            activeIndex = index;

            slider.style.left = 0 + "px";
            slider.innerHTML = "";

            initSlider(activeIndex);
            nextSlideClone();
            changeNavElements(activeIndex);

            animate({
                duration: 1000,
                draw: (progress) => {
                    document.querySelector(".slider__item").style.width =
                        width * (1 - progress) + "px";
                },
                removeElement: document.querySelector(".slider__item"),
            });
        });
    });
};

/**
 * Инициализация точек навигации.
 */
const initNav = () => {
    for (let i = 0; i < sliderItems.length; i++) {
        const navElement = document.createElement("div");
        navElement.classList.add("slider__nav");
        nav[0].appendChild(navElement);
    }
    nav[0].children[0].classList.add("active-nav");

    navListener();
};

/**
 * Инициализация слайдера.
 * @param index
 */
const initSlider = (index) => {
    createSlide(index, -1);

    nextSlideClone();
    prevSlideClone();
};

/**
 * Добавление следующего слайда.
 */
const nextSlideClone = () => {
    let nextIndex = activeIndex + 1;

    if (nextIndex >= sliderItems.length) {
        nextIndex = 0;
    }

    createSlide(nextIndex, -1);
};

/**
 * Добавление предыдущего слайда.
 */
const prevSlideClone = (prev = false) => {
    let prevIndex = activeIndex - 1;

    if (prevIndex < 0) {
        prevIndex = sliderItems.length - 1;
    }

    createSlide(prevIndex, 1, prev);
};

/**
 * Переход к следующему слайду.
 */
const nextSlide = () => {
    slider.style.left = "-520px";
    if (!active) return;
    active = !active;

    activeIndex++;

    if (activeIndex >= sliderItems.length) {
        activeIndex = 0;
    }

    changeNavElements(activeIndex);
    nextSlideClone();

    animate({
        duration: 1000,
        draw: (progress) => {
            document.querySelector(".slider__item").style.width =
                width * (1 - progress) + "px";
        },
        removeElement: document.querySelector(".slider__item"),
    });
};

/**
 * Переход к предыдущему слайду.
 */
const prevSlide = () => {
    slider.style.left = "-520px";
    if (!active) return;
    active = !active;

    activeIndex--;

    if (activeIndex < 0) {
        activeIndex = sliderItems.length - 1;
    }

    changeNavElements(activeIndex);
    prevSlideClone(true);

    animate({
        duration: 1000,
        draw: (progress) => {
            document.querySelector(".slider__item").style.width = width * progress + "px";
        },
        removeElement: document.querySelector(".slider__item:last-child"),
    });
};

initSlider(activeIndex);
initNav();

rightArrow.addEventListener("click", () => {
    nextSlide();
});

leftArrow.addEventListener("click", () => {
    prevSlide();
});

/**
 * Анимация появления слайда.
 * @param duration
 * @param draw
 * @param removeElement
 */
const animate = ({ duration, draw, removeElement }) => {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let step = (time - start) / duration;
        if (step > 1) step = 1;
        draw(step);
        if (step < 1) {
            requestAnimationFrame(animate);
        } else {
            removeElement.remove();
            active = true;
        }
    });
};
