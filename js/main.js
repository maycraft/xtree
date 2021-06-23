//Настройка маски для ввода номера телефона
$('input[name="phone"]').mask("+7 (999) 999-99-99");

const body = document.body;
const priceForm = document.querySelector('.price__form');
const linksMenu = document.querySelectorAll('.menu a');
const arrow = document.querySelector('.arrow');
const burmenu = document.querySelector('.burmenu');
const menu = document.querySelector('.menu');
const callbackBtn = document.querySelector('.callback__btn');
const callbackModal = document.getElementById('callback__modal');
const callbackForm = document.querySelector('.callback__form');
const callbackClose = document.querySelector('.callback__close');

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
        menu.style.height = 'auto';
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

//вызов формы обратного вызова
callbackBtn.addEventListener( 'click', event => {
    event.preventDefault();
    body.classList.add('modal-open');
    callbackModal.classList.add('modal-active');
    setTimeout(() => {
        callbackForm.classList.add('show-up');
    }, 0);
})

callbackClose.addEventListener( 'click', event => {
    event.preventDefault();
    callbackForm.classList.remove('show-up');
    callbackForm.addEventListener( 'transitionend', () => {
        body.classList.remove('modal-open');
        callbackModal.classList.remove('modal-active');
    }, { once: true } )
})

document.addEventListener( 'click', ({target}) => {
    if(target.classList.contains('overlay')){
        callbackForm.classList.remove('show-up');
        callbackForm.addEventListener( 'transitionend', () => {
            body.classList.remove('modal-open');
            callbackModal.classList.remove('modal-active');
        }, { once: true } )
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