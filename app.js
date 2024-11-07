let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'PRODUCT NAME 1', image: '1.PNG', price: 120000 },
    { id: 2, name: 'PRODUCT NAME 2', image: '2.PNG', price: 120000 },
    { id: 3, name: 'PRODUCT NAME 3', image: '3.PNG', price: 220000 },
    { id: 4, name: 'PRODUCT NAME 4', image: '4.PNG', price: 123000 },
    { id: 5, name: 'PRODUCT NAME 5', image: '5.PNG', price: 320000 },
    { id: 6, name: 'PRODUCT NAME 6', image: '6.PNG', price: 120000 },
    { id: 7, name: 'PRODUCT NAME 6', image: '1.PNG', price: 150000 },
    { id: 8, name: 'PRODUCT NAME 6', image: '2.PNG', price: 170000 },
    { id: 9, name: 'PRODUCT NAME 6', image: '3.PNG', price: 180000 },
    { id: 10, name: 'PRODUCT NAME 6', image: '4.PNG', price: 190000 },
    { id: 11, name: 'PRODUCT NAME 6', image: '5.PNG', price: 90000 },
    { id: 12, name: 'PRODUCT NAME 6', image: '6.PNG', price: 760000 },
    
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item', 'col');
        newDiv.innerHTML = `
            <div>
                <img src="image/${value.image}" alt="${value.name}" class="img-fluid">
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
                <button class="btn btn-dark mt-2" onclick="addToCard(${key})">Add To Cart</button>
            </div>
        `;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}" alt="${value.name}" class="img-fluid"></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}


/******************* Slider Section javascript code ************************/
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    // Loop to the beginning/end if the index goes out of bounds
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    // Move the slides container to show the current slide
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function moveSlide(step) {
    showSlide(currentIndex + step);
}

// Auto-slide every 3 seconds
setInterval(() => moveSlide(1), 3000);
