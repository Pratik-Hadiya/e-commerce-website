let carts = document.querySelectorAll('.product');

let products = [
    {
        name: 'Jacob Co. Twin Turbo',
        tag: 'jacobtwinturbo.png',
        price: '15000',
        inCart: 0
    },
    {
        name: 'Rolex Amserdam',
        tag: 'rolexamsterdam.png',
        price: '12000',
        inCart: 0
    },
    {
        name: 'Jacob Co. Astronomia',
        tag: 'jacobastronomia.png',
        price: '18000',
        inCart: 0
    },
    {
        name: 'Jacob Co. Solar',
        tag: 'jacobsolar.png',
        price: '20000',
        inCart: 0
    },
    {
        name: 'Corum - Golden Bridge',
        tag: 'corumgoldenbridge.png',
        price: '5000',
        inCart: 0
    },
    {
        name: 'Diesel - Black Analog',
        tag: 'dieselblackanalog.png',
        price: '5000',
        inCart: 0
    },
    {
        name: 'Ferrari - Pilota E   vo',
        tag: 'ferraripilotaevo.png',
        price: '5000',
        inCart: 0
    },
    {
        name: 'Kredo - Otus 2',
        tag: 'kredootus2.png',
        price: '5000',
        inCart: 0
    },
    {
        name: 'Maserati - Tragaurdo',
        tag: 'maseratitragaurdo.png',
        price: '5000',
        inCart: 0
    },
    {
        name: 'Corum - Heritage',
        tag: 'corumheritage.png',
        price: '5000',
        inCart: 0
    },
    {
        name: 'Diesel - Mega Chief',
        tag: 'dieselmegachiefanalog.png',
        price: '5000',
        inCart: 0
    },
    {
        name: 'Sevenfriday - q101',
        tag: 'sevenfridayq101.png',
        price: '500',
        inCart: 0
    }
]

for(let i=0; i <carts.length; i++)
{
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    }

    )
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }   

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + parseInt(product.price));
    } else {
        localStorage.setItem("totalCost", product.price);
    }

    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        let cartCost = localStorage.getItem('totalCost');
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cont">
                <div class="product">
                    <img src="./products/${item.tag}">
                    <span>${item.name}</span>
                    <span>$${item.price},00</span>
                    <span>${item.inCart}</span>
                    <span>$${item.price * item.inCart},00</span>
                </div>
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
            </div>
                `;
    }

}
displayCart();
onLoadCartNumbers();
