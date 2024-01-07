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

closeMenu.onclick = () => {
    burger.style.display = "none";
};

openMenu.onclick = () => {
    burger.style.display = "block";
};

/**
 * Скрытие, отрытие модальных окон
 */
const modalCookie = document.querySelector(".modal_cookie"),
    modalForm = document.getElementById("modal_form"),
    modalOverlay = document.getElementById("modal-overlay");

const closeCookieModal = () => {
    modalCookie.style.display = "none";
};

const openFormModal = () => {
    modalForm.style.display = "block";
    modalOverlay.style.display = "block";
};

const closeFormModal = () => {
    modalForm.style.display = "none";
    modalOverlay.style.display = "none";
};

modalOverlay.addEventListener("click", () => {
    closeFormModal();
});

const openSuccessModal = () => {
    console.log("hello world");
};

/**
 * Валидация полей
 */
const name = document.getElementById("name"),
    fieldNameError = document.querySelector(".name-error"),
    email = document.getElementById("email"),
    fieldEmailError = document.querySelector(".email-error"),
    phone = document.getElementById("phone"),
    fieldPhoneError = document.querySelector(".phone-error");

// TODO: Придумать как сделать, чтобы пропускать данные после успешной валидации.
let error = 0;
// TODO: так же как-то вывести общие сообщения об ошибках
/**
 * Валидация формы перед отправлением
 */
const validationFieldsForm = () => {
    if (!name.value) {
        fieldNameError.innerText = "This field is required.";
    } else if (name.value) {
        fieldNameError.innerText = "";
    }

    if (!email.value) {
        fieldEmailError.innerText = "This field is required.";
    } else if (email.value) {
        fieldEmailError.innerText = "";
    }

    if (!phone.value) {
        fieldPhoneError.innerText = "This field is required.";
    } else if (phone.value) {
        fieldPhoneError.innerText = "";
    }

    console.log(error);

    return error === 0;
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
    const pattern = /^\+7[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

    // Проверяем есть ли в value phone regex
    if (!phone.value.match(pattern)) {
        console.log(phone.value.match);
        fieldPhoneError.innerText = "Invalid phone";
    } else {
        fieldPhoneError.innerText = "";
    }
});

/**
 * Отправка формы
 * @param event
 */
const onSubmit = (event) => {
    event.preventDefault();

    if (validationFieldsForm()) {
        closeFormModal();
        openSuccessModal();
    }
};
