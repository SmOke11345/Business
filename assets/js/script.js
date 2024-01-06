const navItems = document.querySelectorAll(".nav__item"),
    headerBtn = document.querySelector(".header__btn");

/**
 * Изменение вида header btn
 * @param i
 */
const changeHeaderBtn = (i) => {
    let changeHeader = "business";

    i === 0 ? (changeHeader = "business") : (changeHeader = "customers");

    if (changeHeader === "business") {
        headerBtn.innerHTML = `<div class="btn btn--secondary"><a href="">Contact sales</a></div>`;
    } else if (changeHeader === "customers") {
        headerBtn.innerHTML = `<div class="wrapper">
                    <div class="wrapper__item">
                        <button>
                            <img alt="Google" src="./assets/img/common/Google.svg">
                        </button>
                    </div>
                    <div class="wrapper__item">
                        <button>
                            <img alt="Apple" src="./assets/img/common/Apple.svg">
                        </button>
                    </div>
                </div>`;
    }
};

/**
 * Изменение стилей в nav
 */
for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", () => {
        // Убираем у всех элементов класс active
        for (let j = 0; j < navItems.length; j++) {
            navItems[j].classList.remove("active");
        }
        // Добавляем класс active к элементу, на котором было событие клик
        navItems[i].classList.add("active");

        changeHeaderBtn(i);
    });
}

/**
 * Фиксирование header
 */
const headerBottom = document.querySelector(".header__bottom");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        headerBottom.classList.add("fixed");
    }
    window.scrollY < 100 && headerBottom.classList.remove("fixed");
});

/**
 * Burger
 */
const closeMenu = document.querySelector(".close"),
    openMenu = document.querySelector(".open"),
    burger = document.querySelector(".burger-menu");

/**
 * Открытие бургер меню
 */
closeMenu.onclick = () => {
    burger.style.display = "none";
};

/**
 * Закрытие бургер меню
 */
openMenu.onclick = () => {
    burger.style.display = "block";
};

/**
 * Скрытие cookie
 */
const cookieModal = document.querySelector(".cookie-modal");

const closeCookieModal = () => {
    cookieModal.style.display = "none";
};
