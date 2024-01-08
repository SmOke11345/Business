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
        // TODO: при нажатии должно закрываться бургер меню и открываться модальное окно
        headerBtn.innerHTML = `<div class="btn btn--secondary" onclick=""><a href="#">Contact sales</a></div>`;
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

closeMenu.onclick = () => {
    burger.style.display = "none";
};

openMenu.onclick = () => {
    burger.style.display = "block";
};

/**
 * Скрытие, отрытие модальных окон
 */
const modalCookie = document.querySelector(".modal-cookie"),
    modalForm = document.getElementById("modal-form"),
    modalSuccess = document.getElementById("modal-success"),
    modalOverlay = document.getElementById("modal-overlay");

const closeCookieModal = () => {
    modalCookie.style.display = "none";
};

const openModal = () => {
    modalForm.style.display = "block";
    modalOverlay.style.display = "flex";
};

const closeModal = () => {
    modalSuccess.style.display = "none";
    modalForm.style.display = "none";
    modalOverlay.style.display = "none";
};

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

const openSuccessModal = () => {
    modalForm.style.display = "none";
    modalSuccess.style.display = "block";
    modalOverlay.style.display = "flex";
};

/**
 * Валидация полей
 */
const form = document.querySelector(".form"),
    name = document.getElementById("name"),
    fieldNameError = document.querySelector(".name-error"),
    email = document.getElementById("email"),
    fieldEmailError = document.querySelector(".email-error"),
    phone = document.getElementById("phone"),
    fieldPhoneError = document.querySelector(".phone-error");

/**
 * Валидация формы перед отправлением
 */
const validateForm = () => {
    !name.value
        ? (fieldNameError.innerText = "This field is required.")
        : (fieldNameError.innerText = "");

    !email.value
        ? (fieldEmailError.innerText = "This field is required.")
        : (fieldEmailError.innerText = "");

    !phone.value
        ? (fieldPhoneError.innerText = "This field is required.")
        : (fieldPhoneError.innerText = "");

    return (
        fieldNameError.innerText === "" &&
        fieldEmailError.innerText === "" &&
        fieldPhoneError.innerText === ""
    );
};

/**
 * Валидация полей при вводе
 */
email.addEventListener("input", () => {
    if (!email.checkValidity()) {
        fieldEmailError.innerText = "Invalid email";
    } else {
        fieldEmailError.innerText = "";
    }
});

phone.addEventListener("input", () => {
    phone.value.length === 1 && (phone.value = `+7${phone.value}`);
    phone.value.length === 5 && (phone.value = phone.value + "-");
    phone.value.length === 9 && (phone.value = phone.value + "-");
    phone.value.length === 12 && (phone.value = phone.value + "-");

    const pattern = /^\+7[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

    // Проверяем есть ли в value phone regex
    if (!phone.value.match(pattern)) {
        fieldPhoneError.innerText = "Invalid phone";
    } else {
        fieldPhoneError.innerText = "";
    }
});

const allRequired = document.querySelector(".all-required");

form.addEventListener("submit", (event) => {
    console.log(allRequired);
    if (!validateForm()) {
        allRequired.innerText = "Please fill in all required fields";
    } else {
        openSuccessModal();
        allRequired.innerText = "";
    }
    event.preventDefault();
});
