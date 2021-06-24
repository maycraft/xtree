//Настройка маски для ввода номера телефона
$('input[name="phone"]').mask("+7 (999) 999-99-99");

const body = document.body;
const priceForm = document.querySelector('.price__form');
const linksMenu = document.querySelectorAll('.menu a');
const arrow = document.querySelector('.arrow');
const burmenu = document.querySelector('.burmenu');
const menu = document.querySelector('.menu');
const modalButtons = document.querySelectorAll('.js-modal-button');
<<<<<<< HEAD
=======
const callbackModal = document.getElementById('callback__modal');
>>>>>>> ab5d469792c6713c25ade73fed1fd907d1ae52b1
const modalCloseButtons = document.querySelectorAll('.modal__close');

//Получение прайса
priceForm.addEventListener( 'submit', event => {
    event.preventDefault();
    const link = document.createElement('a');
    link.setAttribute('href', '../price.csv');
    link.setAttribute('download', 'price.csv');
    link.click();
})

//Плавный переход в меню
linksMenu.forEach( link => {
    link.addEventListener( 'click', event => {
        event.preventDefault();
        const id = event.target.getAttribute('href');
        const block = document.querySelector(id);
        scrollTo({
            top: block.offsetTop + 20,
            behavior: 'smooth'
        })
    })
})
    
//Стрелака на вверх
function checkScroll() {
    arrow.style.display = (window.scrollY > 100) ? 'block' : '';
}

document.addEventListener( 'scroll', checkScroll );

arrow.addEventListener( 'click', () => {
    scrollTo({
        top: 0,
        behavior: 'smooth'
    })
});

//меню гамбургер
burmenu.addEventListener( 'click', (event) => {
    event.preventDefault();
    if( !menu.classList.contains('show') ){
        menu.classList.add('show');
        let height = menu.clientHeight + 'px';
        menu.style.height = '0px';

        setTimeout(() => {
            menu.style.height = height;
        }, 0);
    }else {
        menu.style.height = '0px';
        menu.addEventListener( 'transitionend', () => {
            menu.classList.remove('show');
            menu.style.height = 'auto';
        }, { once: true } )
    }
});

//вызов модального окна
modalButtons.forEach( button => {
    button.addEventListener( 'click', event => {
        event.preventDefault();
        body.classList.add('modal-open');
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`div[data-id="${modalId}"]`);
        modal.classList.add('active');
        const modalContent = modal.querySelector('.modal__content');
        setTimeout(() => {
            modalContent.classList.add('show-up');
        }, 0);
    })
})

function closeModal(modal) {
    const modalContent = modal.querySelector('.modal__content');
    modalContent.classList.remove('show-up');
    modalContent.addEventListener( 'transitionend', () => {
        body.classList.remove('modal-open');
        modal.classList.remove('active');
    }, { once: true } )
}

modalCloseButtons.forEach( button => {
    button.addEventListener('click', event => {
        const modal = button.closest('.modal');
        event.preventDefault();
        closeModal(modal);
    })
})

document.addEventListener( 'click', ({target}) => {
    if(target.classList.contains('overlay')){
        closeModal(target);
    }
})

//Форма с подсчётом
let orderCount = 15;
const orderForm = document.querySelector('.order__form');

const orderCounter = document.querySelector('.order__counter');

function getOrderCount(number) {
    const arr = number.toString().split('');
    orderCounter.innerHTML = '';
    arr.forEach( item => {
        const itemCount = document.createElement('span');
        itemCount.classList.add('customer__number');
        itemCount.innerText = item;
        orderCounter.append(itemCount);
    })
}

orderForm.addEventListener( 'submit', (event) => {
    event.preventDefault();
    orderCount++;
    getOrderCount(orderCount);
    event.target.reset();
})

getOrderCount(orderCount);